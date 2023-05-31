import { defs, tiny } from "./examples/common.js";
import { config, updateBar} from './frontend/ui.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

const {Triangle, Square, Tetrahedron, Windmill, Cube, Subdivision_Sphere} = defs;


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

            triangle : new defs.Triangle(),
            windmill : new Windmill(),
            square : new defs.Square(),
            // tetra : new defs.Tetrahedron(),
            cube : new defs.Cube(),
            disk : new defs.Regular_2D_Polygon(5,100),
            cone : new defs.Cone_Tip(5, 5,  [[.34, .66], [0, 1]]),
            capped_cylinder : new defs.Capped_Cylinder(5, 5, [[.34, .66], [0, 1]]),
            rounded_capped_cylinder : new defs.Rounded_Capped_Cylinder(5, 5,  [[.34, .66], [0, 1]]),
            
            cylinder : new defs.Cylindrical_Tube(1,5, [[.34, .66], [0, 1]]),

            // shapes for environment
            background_sky: new defs.Square(),
            floor: new defs.Cube(),
            walls: new defs.Cube(),
            rectangle: new defs.Cube(),
        };

        // *** Materials
        this.materials = {
            test: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, specularity: 0.6, color: hex_color("#f54245")}),
            test2: new Material(new Gouraud_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#70B2E7")}),
            background_sky: new Material(new defs.Phong_Shader(),
                {ambient: 0.5, diffusivity: 0.8, specularity: 0, color: hex_color("#99b6f2")}),
            floor: new Material(new defs.Phong_Shader(),
                {ambient: .5, diffusivity: .4, specularity: 0.3, color: hex_color("#C4C1E0")}),
            walls: new Material(new defs.Phong_Shader(),
                {ambient: .5, diffusivity: .4, specularity: 0.3, color: hex_color("#C4C1E0")}),
            back_wall: new Material(new defs.Phong_Shader(),
                {ambient: .5, diffusivity: .4, specularity: 0.3, color: hex_color("#C4C1E0")}), 
            gun: new Material(new defs.Phong_Shader(),
                {ambient: 0.6, diffusivity: 0.8, specularity: 1, color: hex_color('#2b2b2b')}),
                   
        }


        // Sound effects
        this.gun_with_ammo = new Audio('assets/sounds/gun_with_ammo.mp3');
        this.shot_odd = new Audio('assets/sounds/gun.mp3');
        this.shot_even = new Audio('assets/sounds/gun.mp3');
        this.laser = new Audio('assets/sounds/laser.mp3');
        this.water_drop = new Audio('assets/sounds/bloop.mp3');
        this.quite_shot = new Audio('assets/sounds/quite_gun.mp3');
        this.shatter = new Audio('assets/sounds/shatter.mp3');
        this.first_hit = new Audio('assets/sounds/first_kill.mp3');
        this.second_hit = new Audio('assets/sounds/second_kill.mp3');
        this.third_hit = new Audio('assets/sounds/third_kill.mp3');
        this.fourth_hit = new Audio('assets/sounds/fourth_kill.mp3');
        this.fifth_hit = new Audio('assets/sounds/fifth_kill.mp3');
        this.spectrum = new Audio('assets/sounds/spectrum_valorant.mp3');
        this.terrible = new Audio('assets/sounds/terrible_voiceline.mp3');
        
        // Used for difficulty 
        // Set the radius size of targets
        this.difficulty = config["difficulty"];
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
        this.target_num = config["scatter"];

        // Strafing 
        this.strafe = config["strafe"];
        this.move_factor = 0;
        if (this.strafe){
            this.move_factor = 2;
            if (this.target_num == 5){
                if (this.difficulty == "medium")
                    this.move_factor = 1;
                else if (this.difficulty == "easy"){
                    this.move_factor = 0.5;
                }
            }
        }
        // console.log(this.strafe);
        
        /*
        !!! Notes on Strafing !!!
        If strafing is active then the window sizes (ECS z) must be further away so the targets do not move offscreen
        */

        // generate a set of locations for all targets
        this.generate_target_locations();

        // How many hits in a row to coordinate sound effect
        this.cont_hits = 0;
        this.cont_misses = 0;

        // Point system
        this.points = 0;

        // Accuracy
        this.hits = 0;
        this.total_shots = 0;
        this.accuracy = 1;

        this.view_dist = 20;

        this.initial_camera_location = Mat4.look_at(vec3(0, 0, this.view_dist), vec3(0, 0, 0), vec3(0, 1, 0));
    }

    // make_control_panel() {
    //     // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
    //     this.key_triggered_button("Easy", ["Control", "e"], () => {this.target_r = 1.5;}); // include generate_target_locations if want to repopulate after changing
    //     this.key_triggered_button("Medium", ["Control", "m"], () => {this.target_r = 1;});
    //     this.key_triggered_button("Hard", ["Control", "h"], () => {this.target_r = 0.5;});
    //     this.new_line();
    //     this.key_triggered_button("1", ["Control", "1"], () => {this.target_num = 1; this.generate_target_locations();});
    //     this.key_triggered_button("3", ["Control", "3"], () => {this.target_num = 3; this.generate_target_locations();});
    //     this.key_triggered_button("5", ["Control", "5"], () => {this.target_num = 5; this.generate_target_locations();});
    //     this.new_line();
    //     this.key_triggered_button("Strafe", ["Control", "s"], () => this.strafe ^= 1);
    //     this.key_triggered_button("Randomize", ["Control", "r"], () => {this.generate_target_locations();});
    //     this.new_line();
    //     this.key_triggered_button("Spectrum Song", ["Control", "m"], () => {this.spectrum.play()});
    // }

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
            // 2 extra cases for strafing
            // min with max and max with min
            if (this.strafe){
                let dist2 = Math.sqrt((ranX-x+2*this.move_factor)**2 + (ranY-y)**2);
                let dist3 = Math.sqrt((ranX-x-2*this.move_factor)**2 + (ranY-y)**2);
                if ((dist2 < 2*this.target_r + 2) || (dist3 < 2*this.target_r + 2)){ // 2 times the radius + 2
                    return true;
                }
            }
        }
        return false;
    }

    // Returns one random location that does not conflict with other targets
    generate_location() {
        let size_factor = 0;
        if (this.target_r == 1.5){
            size_factor = 1;
        }
        let strafe_speed = 0;

        if (this.strafe){
            strafe_speed = Math.random()*(Math.PI+Math.PI) + (-Math.PI);
        }
        let xMin = -12+size_factor+this.move_factor, xMax = 12-size_factor-this.move_factor;
        let yMin = -2, yMax = 6-size_factor-this.move_factor;

        // Generate random coordinates
        let ranX, ranY, ranZ = Math.random()*5 + -2;
        do {
            ranX = Math.random() * (xMax-xMin) + xMin;
            ranY = Math.random() * (yMax-yMin) + yMin;
        }
        while (this.target_collision(ranX, ranY));
        return vec4(ranX, ranY, ranZ, strafe_speed);
    }

    generate_target_locations(){
        this.target_locations = new Set();
        for (let i = 0; i < this.target_num; i++){
            this.target_locations.add(this.generate_location());
        }
    }


    draw_targets(context, program_state, t){
        let model_transform = Mat4.identity();
        let r = this.target_r;
        for (let coord of this.target_locations){
            this.shapes.sphere.draw(context, program_state, model_transform.times(Mat4.translation(coord[0]+this.move_factor*Math.sin(coord[3]*t), coord[1], coord[2])).times(Mat4.scale(r, r, r)), this.materials.test);
        }
    }

    // Determine if a target was hit
    hit_target(coord, pos_world, t){
        let t_x = coord[0], t_y = coord[1]; // Target coodinates
        if (this.strafe){
            t_x += this.move_factor*Math.sin(coord[3]*t);
        }
        let h_x = pos_world[0], h_y = pos_world[1]; // Mouse click coordinates
        let d = Math.sqrt((t_x-h_x)**2 + (t_y-h_y)**2);
        console.log(t_x);
        console.log(h_x);
        if (d <= this.target_r){ // If the mouse click is within radius length of target
            return true;
        }
        return false;
    }


    // Mouse Picking 
    my_mouse_down(e, pos, context, program_state, t) {
        // Putting sounds here makes it faster? 
        // let gun_with_ammo = new Audio('assets/sounds/gun_with_ammo.mp3');
        // let heavy_shot = new Audio('assets/sounds/gun.mp3');
        // let laser = new Audio('assets/sounds/laser.mp3');
        // let water_drop = new Audio('assets/sounds/bloop.mp3');
        // let quite_shot = new Audio('assets/sounds/quite_gun.mp3');
        // let shatter = new Audio('assets/sounds/shatter.mp3');
        // let first_hit = new Audio('assets/sounds/first_kill.mp3');
        // let second_hit = new Audio('assets/sounds/second_kill.mp3');
        // let third_hit = new Audio('assets/sounds/third_kill.mp3');
        // let fourth_hit = new Audio('assets/sounds/fourth_kill.mp3');

        let missed = true;

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

        /* To determine if the mouse click hit any object
           just calculate the distance between the x and y coordinates of the 
        */
        // gun_with_ammo.play();
        // quite_shot.play();
        // laser.play();
        // Two of the same sounds to allow overlap
        if (this.hits % 2 == 1){
            this.shot_odd.play();
        }
        else {
            this.shot_even.play();
        }
        

        this.total_shots++;
        for (const coord of this.target_locations){
            // Interpolation for near and far to get to the t of the z-coordinate of the target 
            let z = coord[2], z1 = pos_world_near[2], z2 = pos_world_far[2];
            let t = (z-z1)/(z2-z1);
            let x = (1-t)*pos_world_near[0]+t*pos_world_far[0];
            let y = (1-t)*pos_world_near[1]+t*pos_world_far[1];
            let world_coord = vec4(x, y, z, 1.0);
            console.log(world_coord); // each target has its own coordinates
            if (this.hit_target(coord, world_coord, t)){
                missed = false;
                this.cont_hits++;
                this.cont_misses = 0;
                // console.log(this.cont_hits);
                // Valorant kill sounds with different sound for more hits
                switch(this.cont_hits){
                    case 1:
                        this.first_hit.play();
                        console.log("first");
                        // console.log(this.cont_hits);
                        break;
                    case 2:
                        this.second_hit.play();
                        // console.log("second");
                        break;
                    case 3:
                        this.third_hit.play();
                        // console.log("third");
                        break;
                    case 4:
                        this.fourth_hit.play();
                        // console.log("fourth");
                        break;
                    default:
                        this.fifth_hit.play();
                        // console.log("ace");
                        this.cont_hits = 0;
                        break;
                }
                this.points += 1000;
                this.hits++;
                this.target_locations.delete(coord);
                this.target_locations.add(this.generate_location());

                break;
            }
        }
        if (missed){
            this.cont_hits = 0;
            this.cont_misses++;
            // easter egg :)
            if (this.cont_misses == 4){
                this.terrible.play();
            }
        }
        this.accuracy = this.hits/this.total_shots;
        this.accuracy = Math.round(this.accuracy*10000)/100
        updateBar(this.points, this.accuracy);
    }

    display(context, program_state) {

        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;


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
                this.my_mouse_down(e, mouse_position(e), context, program_state, t);
            });
        }

        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, .1, 1000);


        const light_position = vec4(0, 12, 8, 1);
        // The parameters of the Light are: position, color, size
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 10000)];
    
        let model_transform = Mat4.identity();

        
        let background_sky_transform = model_transform;
        background_sky_transform = background_sky_transform.times(Mat4.scale(context.width, context.height, 1))
                                                            .times(Mat4.translation(0,0,-4));
        this.shapes.background_sky.draw(context, program_state, background_sky_transform, this.materials.background_sky);
                                        
        this.draw_floor(context, program_state);
        this.draw_walls(context, program_state);
        
        this.draw_targets(context, program_state, t);



        // Scuffed "gun"
        // connect mouse clicking to recoil if possible
        let recoil = 0;
        // 0.2*Math.sin(3*Math.PI*t);

        let gun_move_transform = Mat4.identity().times(Mat4.translation(2,-1,16)).times(Mat4.rotation(-44*Math.PI/90,0,1,0)).times(Mat4.rotation(-1*Math.PI/40,0,0,1)).times(Mat4.scale(0.3, 0.3, 0.3));



        let gun_base_transform = gun_move_transform.times(Mat4.translation(0.2,0,0)).times(Mat4.scale(3.5,0.75,0.4));
        this.shapes.cube.draw(context, program_state, gun_base_transform, this.materials.gun);

        let gun_base_top_transform = gun_move_transform.times(Mat4.translation(3,0.1,0)).times(Mat4.rotation(-0.15, 0,0,1)).times(Mat4.scale(2,0.6,0.4)).times(Mat4.rotation(0.5, 0,0,1));
        this.shapes.cube.draw(context, program_state, gun_base_top_transform, this.materials.gun);

        let gun_base_front_transform = gun_move_transform.times(Mat4.translation(-2.3,0.45,0)).times(Mat4.rotation(0.01,0,0,1)).times(Mat4.scale(2,0.3,0.4)).times(Mat4.rotation(-0.08, 0,0,1));
        this.shapes.cube.draw(context, program_state, gun_base_front_transform, this.materials.gun);  

        let gun_clip_transform = gun_move_transform.times(Mat4.translation(0.65,-1.6,0)).times(Mat4.scale(0.8, 2, 0.23)).times(Mat4.rotation(0.035,0,0,1));
        this.shapes.cube.draw(context, program_state, gun_clip_transform, this.materials.gun);

        let gun_handle_transform = gun_move_transform.times(Mat4.translation(3.83,-1.7, 0)).times(Mat4.rotation(0.3,0,0,1)).times(Mat4.scale(0.52,1.3,0.2)).times(Mat4.rotation(0.08,0,0,1));;
        this.shapes.cube.draw(context, program_state, gun_handle_transform, this.materials.gun);

        let gun_stock_transform = gun_move_transform.times(Mat4.translation(6,-0.5,0)).times(Mat4.scale(2,0.55,0.4));
        this.shapes.cube.draw(context, program_state, gun_stock_transform, this.materials.gun);

        let gun_stock_2_transform = gun_move_transform.times(Mat4.translation(6.78,-0.85,0)).times(Mat4.rotation(0.3, 0,0,1)).times(Mat4.scale(1.1, 0.6, 0.4));
        this.shapes.cube.draw(context, program_state, gun_stock_2_transform, this.materials.gun);

        let gun_stock_3_transform = gun_move_transform.times(Mat4.translation(6.96,-1.34,0)).times(Mat4.rotation(-0.1, 0,0,1)).times(Mat4.scale(0.97,0.50, 0.3));
        this.shapes.cube.draw(context, program_state, gun_stock_3_transform, this.materials.gun);

        let gun_barrel_tranform = gun_move_transform.times(Mat4.translation(-6.5,0,0)).times(Mat4.scale(6,0.45,0.38)).times(Mat4.rotation(Math.PI/2, 0,1,0));
        this.shapes.cylinder.draw(context, program_state, gun_barrel_tranform, this.materials.gun);
        
        let gun_barrel_front_transform = gun_move_transform.times(Mat4.translation(-2,-0.24,0)).times(Mat4.rotation(-0.05,0,0,1)).times(Mat4.scale(2,0.5,0.4)).times(Mat4.rotation(0.2,0,0,1));
        this.shapes.cube.draw(context, program_state, gun_barrel_front_transform, this.materials.gun);

        let gun_barrel_wedge_transform = gun_move_transform.times(Mat4.translation(-3.415,-0.6,0)).times(Mat4.scale(0.15,0.25,0.4)).times(Mat4.rotation(-0.4,0,0,1));
        this.shapes.cube.draw(context, program_state, gun_barrel_wedge_transform, this.materials.gun);

        let gun_aim_transform = gun_move_transform.times(Mat4.translation(-3.6,0.68,0)).times(Mat4.scale(0.4,0.2,0.08)).times(Mat4.rotation(0.4,0,0,1));
        this.shapes.cube.draw(context, program_state, gun_aim_transform, this.materials.gun);

   
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

