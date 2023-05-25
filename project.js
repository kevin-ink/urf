import { defs, tiny } from "./examples/common.js";

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export class Project extends Scene {
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();

        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            torus: new defs.Torus(15, 15),
            torus2: new defs.Torus(3, 15),
            sphere: new defs.Subdivision_Sphere(4),
            circle: new defs.Regular_2D_Polygon(1, 15),

            // shapes for environment
            background_sky: new defs.Square(),
            floor: new defs.Cube(),
            walls: new defs.Cube(),

        };

        // *** Materials
        this.materials = {
            test: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, specularity: 0.6, color: hex_color("#DF182D")}),
            test2: new Material(new Gouraud_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#70B2E7")}),
            background_sky: new Material(new defs.Phong_Shader(),
                {ambient: 0.5, diffusivity: 0.8, specularity: 0, color: hex_color("#99b6f2")}),
            floor: new Material(new defs.Phong_Shader(),
                {ambient: .5, diffusivity: .4, specularity: 0.3, color: hex_color("#e3dfd3")}),
            walls: new Material(new defs.Phong_Shader(),
                {ambient: .5, diffusivity: .4, specularity: 0.3, color: hex_color("#e3dfd3")}),
            back_wall: new Material(new defs.Phong_Shader(),
                {ambient: .5, diffusivity: .4, specularity: 0.3, color: hex_color("#e3dfd3")}), 
                   
        }
        
        // Used for difficulty 
        // Set the radius size of targets
        this.difficulty = "medium";
        if (this.difficulty == "easy"){
            this.target_r = 1.5;
        }
        else if (this.difficulty == "medium"){
            this.target_r = 1;
        }
        else {
            this.target_r = 0.5;
        }

        // Number of Targets 
        this.target_num = 3;
        this.target_locations = new Set();
        for (let i = 0; i < this.target_num; i++){
            this.target_locations.add(this.generate_location());
        }

        // Strafing 
        this.strafe = false;
        /*
        !!! Notes on Strafing !!!
        If strafing is active then the window sizes (ECS z) must be further away so the targets do not move offscreen
        Must create another collision detection function so that movement is detected 
        since we want strafing to be random and different we must implement another function to generate random strafes
        this means we must store the periodicity of each target 

        */

        this.view_dist = 20;

        this.initial_camera_location = Mat4.look_at(vec3(0, 0, this.view_dist), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    make_control_panel() {
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        this.key_triggered_button("Easy", ["Control", "e"], () => null);
        this.key_triggered_button("Medium", ["Control", "m"], () => null);
        this.key_triggered_button("Hard", ["Control", "h"], () => null);
        this.new_line();
        this.key_triggered_button("1", ["Control", "1"], () => null);
        this.key_triggered_button("3", ["Control", "3"], () => null);
        this.key_triggered_button("5", ["Control", "5"], () => null);
        this.new_line();
        this.key_triggered_button("Strafe", ["Control", "s"], () => null);
    }

    draw_floor(context, program_state){
        let floor_transform = Mat4.identity();
        floor_transform = floor_transform.times(Mat4.scale(15, 1, context.width))
                                         .times(Mat4.translation(0, -this.view_dist/4, 0));
        this.shapes.floor.draw(context, program_state, floor_transform, this.materials.floor);
    }

    draw_walls(context, program_state){
        let left_wall_transform = Mat4.identity();

        left_wall_transform = left_wall_transform.times(Mat4.scale(4, 5, context.width))
                                                 .times(Mat4.rotation(1.1, 0, 1, 0))
                                                 .times(Mat4.translation(-2.5, 0, -2));
        this.shapes.walls.draw(context, program_state, left_wall_transform, this.materials.walls);

        let right_wall_transform = Mat4.identity();

        right_wall_transform = right_wall_transform.times(Mat4.scale(.2, 5, context.width))
                                                   .times(Mat4.translation(68, 0, 0))
                                                   .times(Mat4.rotation(1.5, 0, 1, 0));
         this.shapes.walls.draw(context, program_state, right_wall_transform, this.materials.walls);

        let back_wall_transform = Mat4.identity();
        back_wall_transform = back_wall_transform.times(Mat4.scale(13.5, 5, 1))
                                                 .times(Mat4.translation(0, 0, -3));
        this.shapes.walls.draw(context, program_state, back_wall_transform, this.materials.back_wall);
    }

    // Check if any of the targets are too close to each other
    target_collision(ranX, ranY) {
        for (let coord of this.target_locations){
            let x = coord[0], y = coord[1];
            let dist = Math.sqrt((ranX-x)**2 + (ranY-y)**2);
            if (dist < 2*this.target_r + 2){ // 2 times the radius + 2
                return true;
            }
        }
        return false;
    }

    // Returns one random location that does not conflict with other targets
    generate_location() {
        let xMin = -12, xMax = 12;
        let yMin = -2, yMax = 6;
        
        // Generate random coordinates
        let ranX, ranY, ranZ = 1;
        // Math.random()*4 + -2;
        do {
            ranX = Math.random() * (xMax-xMin) + xMin;
            ranY = Math.random() * (yMax-yMin) + yMin;
        }
        while (this.target_collision(ranX, ranY));
        return vec3(ranX, ranY, ranZ);
    }


    draw_targets(context, program_state, t){
        let model_transform = Mat4.identity();
        let r = this.target_r;
        let d = 0;
        if (this.strafe){
            d = Math.sin(t);
        }
        for (let coord of this.target_locations){
            this.shapes.sphere.draw(context, program_state, model_transform.times(Mat4.translation(coord[0]+d, coord[1], coord[2])).times(Mat4.scale(r, r, r)), this.materials.test);
        }
    }

    // Determine if a target was hit
    hit_target(coord, pos_world){
        let t_x = coord[0], t_y = coord[1];
        let h_x = pos_world[0], h_y = coord[1];
        let d = Math.sqrt((t_x-h_x)**2 + (t_y-h_y)**2);
        if (d <= this.target_r){
            return true;
        }
        return false;
    }

    interpolation(p1, p2){
        return p1/(p1-p2);
    }

    // Mouse Picking 
    my_mouse_down(e, pos, context, program_state) {
        let pos_ndc_near = vec4(pos[0], pos[1], -1.0, 1.0);
        let pos_ndc_far  = vec4(pos[0], pos[1],  1.0, 1.0);
        let center_ndc_near = vec4(0.0, 0.0, -1.0, 1.0);
        let P = program_state.projection_transform;
        let V = program_state.camera_inverse;
        let pos_world_near = Mat4.inverse(P.times(V)).times(pos_ndc_near);
        let pos_world_far  = Mat4.inverse(P.times(V)).times(pos_ndc_far);
        let center_world_near  = Mat4.inverse(P.times(V)).times(center_ndc_near);
        pos_world_near.scale_by(1 / pos_world_near[3]);
        pos_world_far.scale_by(1 / pos_world_far[3]);
        center_world_near.scale_by(1 / center_world_near[3]);

        // Interpolation for near and far to get z = 0
        // 0 = (1-t)zfar + (t)znear
        // use t to find the values for x and y at z = 0
        let t = this.interpolation(pos_world_near[2], pos_world_far[2]);
        let x = (1-t)*pos_world_near[0]+t*pos_world_far[0];
        let y = (1-t)*pos_world_near[1]+t*pos_world_far[1];
        let world_coord = vec4(x, y, 0.0, 1.0);

        console.log(world_coord);

        /* To determine if the mouse click hit any object
           just calculate the distance between the x and y coordinates of the 
        */
        for (const coord of this.target_locations){
            if (this.hit_target(coord, world_coord)){
                this.target_locations.delete(coord);
                this.target_locations.add(this.generate_location());
                break;
            }
        }
    }

    display(context, program_state) {
        // display():  Called once per frame of animation.
        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(this.initial_camera_location);

            let canvas = context.canvas;
            const mouse_position = (e, rect = canvas.getBoundingClientRect()) =>
                vec((e.clientX - (rect.left + rect.right) / 2) / ((rect.right - rect.left) / 2),
                    (e.clientY - (rect.bottom + rect.top) / 2) / ((rect.top - rect.bottom) / 2));

            canvas.addEventListener("mousedown", e => {
                e.preventDefault();
                const rect = canvas.getBoundingClientRect()
                this.my_mouse_down(e, mouse_position(e), context, program_state);
        });
    }

        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, .1, 1000);


        const light_position = vec4(0, 8, 8, 1);
        // The parameters of the Light are: position, color, size
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];

        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
    
        let model_transform = Mat4.identity();

        // SCUFF BACKGROUND
            let background_sky_transform = model_transform;
        background_sky_transform = background_sky_transform.times(Mat4.scale(context.width, context.height, 1))
                                                            .times(Mat4.translation(0,0,-4));
        this.shapes.background_sky.draw(context, program_state, background_sky_transform, this.materials.background_sky);
                                        
        this.draw_floor(context, program_state);
        this.draw_walls(context, program_state);
        
        this.draw_targets(context, program_state, t);
   
    }
}

class Gouraud_Shader extends Shader {
    // This is a Shader using Phong_Shader as template

    constructor(num_lights = 2) {
        super();
        this.num_lights = num_lights;
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return ` 
        precision mediump float;
        const int N_LIGHTS = ` + this.num_lights + `;
        uniform float ambient, diffusivity, specularity, smoothness;
        uniform vec4 light_positions_or_vectors[N_LIGHTS], light_colors[N_LIGHTS];
        uniform float light_attenuation_factors[N_LIGHTS];
        uniform vec4 shape_color;
        uniform vec3 squared_scale, camera_center;

        // Specifier "varying" means a variable's final value will be passed from the vertex shader
        // on to the next phase (fragment shader), then interpolated per-fragment, weighted by the
        // pixel fragment's proximity to each of the 3 vertices (barycentric interpolation).
        varying vec3 N, vertex_worldspace;
        // ***** PHONG SHADING HAPPENS HERE: *****                                       
        vec3 phong_model_lights( vec3 N, vec3 vertex_worldspace ){                                        
            // phong_model_lights():  Add up the lights' contributions.
            vec3 E = normalize( camera_center - vertex_worldspace );
            vec3 result = vec3( 0.0 );
            for(int i = 0; i < N_LIGHTS; i++){
                // Lights store homogeneous coords - either a position or vector.  If w is 0, the 
                // light will appear directional (uniform direction from all points), and we 
                // simply obtain a vector towards the light by directly using the stored value.
                // Otherwise if w is 1 it will appear as a point light -- compute the vector to 
                // the point light's location from the current surface point.  In either case, 
                // fade (attenuate) the light as the vector needed to reach it gets longer.  
                vec3 surface_to_light_vector = light_positions_or_vectors[i].xyz - 
                                               light_positions_or_vectors[i].w * vertex_worldspace;                                             
                float distance_to_light = length( surface_to_light_vector );

                vec3 L = normalize( surface_to_light_vector );
                vec3 H = normalize( L + E );
                // Compute the diffuse and specular components from the Phong
                // Reflection Model, using Blinn's "halfway vector" method:
                float diffuse  =      max( dot( N, L ), 0.0 );
                float specular = pow( max( dot( N, H ), 0.0 ), smoothness );
                float attenuation = 1.0 / (1.0 + light_attenuation_factors[i] * distance_to_light * distance_to_light );
                
                vec3 light_contribution = shape_color.xyz * light_colors[i].xyz * diffusivity * diffuse
                                                          + light_colors[i].xyz * specularity * specular;
                result += attenuation * light_contribution;
            }
            return result;
        } `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        return this.shared_glsl_code() + `
            attribute vec3 position, normal;                            
            // Position is expressed in object coordinates.
            
            uniform mat4 model_transform;
            uniform mat4 projection_camera_model_transform;
    
            void main(){                                                                   
                // The vertex's final resting place (in NDCS):
                gl_Position = projection_camera_model_transform * vec4( position, 1.0 );
                // The final normal vector in screen space.
                N = normalize( mat3( model_transform ) * normal / squared_scale);
                vertex_worldspace = ( model_transform * vec4( position, 1.0 ) ).xyz;
            } `;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        // A fragment is a pixel that's overlapped by the current triangle.
        // Fragments affect the final image or get discarded due to depth.
        return this.shared_glsl_code() + `
            void main(){                                                           
                // Compute an initial (ambient) color:
                gl_FragColor = vec4( shape_color.xyz * ambient, shape_color.w );
                // Compute the final color with contributions from lights:
                gl_FragColor.xyz += phong_model_lights( normalize( N ), vertex_worldspace );
            } `;
    }

    send_material(gl, gpu, material) {
        // send_material(): Send the desired shape-wide material qualities to the
        // graphics card, where they will tweak the Phong lighting formula.
        gl.uniform4fv(gpu.shape_color, material.color);
        gl.uniform1f(gpu.ambient, material.ambient);
        gl.uniform1f(gpu.diffusivity, material.diffusivity);
        gl.uniform1f(gpu.specularity, material.specularity);
        gl.uniform1f(gpu.smoothness, material.smoothness);
    }

    send_gpu_state(gl, gpu, gpu_state, model_transform) {
        // send_gpu_state():  Send the state of our whole drawing context to the GPU.
        const O = vec4(0, 0, 0, 1), camera_center = gpu_state.camera_transform.times(O).to3();
        gl.uniform3fv(gpu.camera_center, camera_center);
        // Use the squared scale trick from "Eric's blog" instead of inverse transpose matrix:
        const squared_scale = model_transform.reduce(
            (acc, r) => {
                return acc.plus(vec4(...r).times_pairwise(r))
            }, vec4(0, 0, 0, 0)).to3();
        gl.uniform3fv(gpu.squared_scale, squared_scale);
        // Send the current matrices to the shader.  Go ahead and pre-compute
        // the products we'll need of the of the three special matrices and just
        // cache and send those.  They will be the same throughout this draw
        // call, and thus across each instance of the vertex shader.
        // Transpose them since the GPU expects matrices as column-major arrays.
        const PCM = gpu_state.projection_transform.times(gpu_state.camera_inverse).times(model_transform);
        gl.uniformMatrix4fv(gpu.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        gl.uniformMatrix4fv(gpu.projection_camera_model_transform, false, Matrix.flatten_2D_to_1D(PCM.transposed()));

        // Omitting lights will show only the material color, scaled by the ambient term:
        if (!gpu_state.lights.length)
            return;

        const light_positions_flattened = [], light_colors_flattened = [];
        for (let i = 0; i < 4 * gpu_state.lights.length; i++) {
            light_positions_flattened.push(gpu_state.lights[Math.floor(i / 4)].position[i % 4]);
            light_colors_flattened.push(gpu_state.lights[Math.floor(i / 4)].color[i % 4]);
        }
        gl.uniform4fv(gpu.light_positions_or_vectors, light_positions_flattened);
        gl.uniform4fv(gpu.light_colors, light_colors_flattened);
        gl.uniform1fv(gpu.light_attenuation_factors, gpu_state.lights.map(l => l.attenuation));
    }

    update_GPU(context, gpu_addresses, gpu_state, model_transform, material) {
        // update_GPU(): Define how to synchronize our JavaScript's variables to the GPU's.  This is where the shader
        // recieves ALL of its inputs.  Every value the GPU wants is divided into two categories:  Values that belong
        // to individual objects being drawn (which we call "Material") and values belonging to the whole scene or
        // program (which we call the "Program_State").  Send both a material and a program state to the shaders
        // within this function, one data field at a time, to fully initialize the shader for a draw.

        // Fill in any missing fields in the Material object with custom defaults for this shader:
        const defaults = {color: color(0, 0, 0, 1), ambient: 0, diffusivity: 1, specularity: 1, smoothness: 40};
        material = Object.assign({}, defaults, material);

        this.send_material(context, gpu_addresses, material);
        this.send_gpu_state(context, gpu_addresses, gpu_state, model_transform);
    }
}

