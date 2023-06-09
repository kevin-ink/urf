import { defs, tiny } from "./examples/common.js";
import { Shape_From_File } from "./examples/obj-file-demo.js";
import {
  config,
  updateBar,
  gameStarted,
  preloadAudio,
  audioFiles,
  endGame,
} from "./frontend/ui.js";

const {
  Vector,
  Vector3,
  vec,
  vec3,
  vec4,
  color,
  hex_color,
  Shader,
  Matrix,
  Mat4,
  Light,
  Shape,
  Material,
  Scene,
  Texture,
} = tiny;

const { Triangle, Square, Tetrahedron, Windmill, Cube, Subdivision_Sphere } =
  defs;

class RectPyramid extends Shape {
  constructor() {
    super("position", "normal");
    // Loop 3 times (for each axis), and inside loop twice (for opposing cube sides):
    this.arrays.position = Vector3.cast(
      [1, 0, 0],
      [0, 4 / 3, 0],
      [0, 0, 0],
      [1, 0, 1 / 3],
      [0, 4 / 3, 1 / 3],
      [0, 0, 1 / 3],
      [0, 0, 0],
      [0, 4 / 3, 0],
      [0, 0, 1 / 3],
      [0, 0, 1 / 3],
      [0, 4 / 3, 1 / 3],
      [0, 4 / 3, 0],
      [0, 0, 0],
      [0, 0, 1 / 3],
      [1, 0, 0],
      [0, 0, 1 / 3],
      [1, 0, 1 / 3],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 1 / 3],
      [0, 4 / 3, 1 / 3],
      [1, 0, 0],
      [0, 4 / 3, 0],
      [0, 4 / 3, 1 / 3]
    );
    this.arrays.normal = Vector3.cast(
      [0, 0, -1],
      [0, 0, -1],
      [0, 0, -1],
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
      [-1, 0, 0],
      [-1, 0, 0],
      [-1, 0, 0],
      [-1, 0, 0],
      [-1, 0, 0],
      [-1, 0, 0],
      [0, -1, 0],
      [0, -1, 0],
      [0, -1, 0],
      [0, -1, 0],
      [0, -1, 0],
      [0, -1, 0],
      [1, 1, 0],
      [1, 1, 0],
      [1, 1, 0],
      [1, 1, 0],
      [1, 1, 0],
      [1, 1, 0]
    );
    // Arrange the vertices into a square shape in texture space too:
    this.indices.push(
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23
    );
  }
}

class Spike extends Shape {
  constructor() {
    super("position", "normal");
    // Loop 3 times (for each axis), and inside loop twice (for opposing cube sides):
    this.arrays.position = Vector3.cast(
      [0, 0, 1],
      [Math.sqrt(1 / 3), 0, 0],
      [-Math.sqrt(1 / 3), 0, 0],
      [0, 1 / 2, 1],
      [Math.sqrt(1 / 3), 1 / 2, 0],
      [-Math.sqrt(1 / 3), 1 / 2, 0],
      [Math.sqrt(1 / 3), 0, 0],
      [-Math.sqrt(1 / 3), 0, 0],
      [Math.sqrt(1 / 3), 1 / 2, 0],
      [Math.sqrt(1 / 3), 1 / 2, 0],
      [-Math.sqrt(1 / 3), 0, 0],
      [-Math.sqrt(1 / 3), 1 / 2, 0],
      [-Math.sqrt(1 / 3), 0, 0],
      [0, 0, 1],
      [0, 1 / 2, 1],
      [-Math.sqrt(1 / 3), 0, 0],
      [-Math.sqrt(1 / 3), 1 / 2, 0],
      [0, 1 / 2, 1],
      [Math.sqrt(1 / 3), 0, 0],
      [0, 0, 1],
      [0, 1 / 2, 1],
      [Math.sqrt(1 / 3), 0, 0],
      [Math.sqrt(1 / 3), 1 / 2, 0],
      [0, 1 / 2, 1]
    );
    this.arrays.normal = Vector3.cast(
      [0, -1, 0],
      [0, -1, 0],
      [0, -1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, -1],
      [0, 0, -1],
      [0, 0, -1],
      [0, 0, -1],
      [0, 0, -1],
      [0, 0, -1],
      [-(3 / 2) * Math.sqrt(1 / 3), 0, 1 / 2],
      [-(3 / 2) * Math.sqrt(1 / 3), 0, 1 / 2],
      [-(3 / 2) * Math.sqrt(1 / 3), 0, 1 / 2],
      [-(3 / 2) * Math.sqrt(1 / 3), 0, 1 / 2],
      [-(3 / 2) * Math.sqrt(1 / 3), 0, 1 / 2],
      [-(3 / 2) * Math.sqrt(1 / 3), 0, 1 / 2],
      [(3 / 2) * Math.sqrt(1 / 3), 0, 1 / 2],
      [(3 / 2) * Math.sqrt(1 / 3), 0, 1 / 2],
      [(3 / 2) * Math.sqrt(1 / 3), 0, 1 / 2],
      [(3 / 2) * Math.sqrt(1 / 3), 0, 1 / 2],
      [(3 / 2) * Math.sqrt(1 / 3), 0, 1 / 2],
      [(3 / 2) * Math.sqrt(1 / 3), 0, 1 / 2]
    );
    // Arrange the vertices into a square shape in texture space too:
    this.indices.push(
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23
    );
  }
}

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
      floor: new defs.Cube(),
      triangle: new defs.Triangle(),
      windmill: new Windmill(),
      square: new defs.Square(),
      // tetra : new defs.Tetrahedron(),
      cube: new defs.Cube(),
      disk: new defs.Regular_2D_Polygon(5, 100),
      cone: new defs.Cone_Tip(5, 5, [
        [0.34, 0.66],
        [0, 1],
      ]),
      capped_cylinder: new defs.Capped_Cylinder(5, 5, [
        [0.34, 0.66],
        [0, 1],
      ]),
      rounded_capped_cylinder: new defs.Rounded_Capped_Cylinder(5, 5, [
        [0.34, 0.66],
        [0, 1],
      ]),

      // Shapes for gun
      cylinder: new defs.Cylindrical_Tube(1, 5, [
        [0.34, 0.66],
        [0, 1],
      ]),
      scope: new defs.Cylindrical_Tube(5, 30, [
        [0.34, 0.66],
        [0, 1],
      ]),
      // shapes for environment
      square: new defs.Square(),
      cube: new defs.Cube(),
      rectangle: new defs.Cube(),
      cone: new defs.Rounded_Closed_Cone(30, 30, [
        [0.34, 0.66],
        [0, 1],
      ]),
      rounded_capped_cylinder: new defs.Rounded_Capped_Cylinder(30, 30, [
        [0.34, 0.66],
        [0, 1],
      ]),
      rounded_uncapped_cylinder: new defs.Cylindrical_Tube(30, 30, [
        [0.34, 0.66],
        [0, 1],
      ]),
      bullet_capped_cylinder: new defs.Capped_Cylinder(5, 30, [
        [0.34, 0.66],
        [0, 1],
      ]),
      window_cylinder: new defs.Cylindrical_Tube(5, 4, [
        [0.34, 0.66],
        [0, 1],
      ]),
      cylinder: new defs.Cylindrical_Tube(30, 30, [
        [0.34, 0.66],
        [0, 1],
      ]),
      spider: new Shape_From_File("assets/background/spider.obj"),
      spider2: new Shape_From_File("assets/background/spider2.obj"),
      grass: new Shape_From_File("assets/background/grass.obj"),
      pistol: new Shape_From_File("assets/background/Pistol_obj.obj"),

      // spike shapes
      spike: new Spike(),
      spike_cylinder: new defs.Capped_Cylinder(5, 40, [
        [0.34, 0.66],
        [0, 1],
      ]),
      spike_sphere: new defs.Subdivision_Sphere(4),

      // target shapes
      target_circle: new defs.Capped_Cylinder(5, 80, [
        [0.34, 0.66],
        [0, 1],
      ]),
      bot_tri: new RectPyramid(),

      // wall
      wall: new defs.Cube(),
    };

    this.shapes.wall.arrays.texture_coord.forEach((v, i, l) => {
      v[0] = v[0] * 2;
      v[1] = v[1] * 2;
    });

    // *** Materials
    this.materials = {
      test: new Material(new defs.Phong_Shader(), {
        ambient: 0.4,
        diffusivity: 0.6,
        specularity: 0.6,
        color: hex_color("#f54245"),
      }),
      test2: new Material(new Gouraud_Shader(), {
        ambient: 0.4,
        diffusivity: 0.6,
        color: hex_color("#70B2E7"),
      }),

      barrel: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 0.5,
        diffusivity: 1,
        specularity: 0,
        texture: new Texture("assets/background/barrel.jpg", "LINEAR"),
      }),

      pistol: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 0.5,
        diffusivity: 1,
        specularity: 1,
        texture: new Texture("assets/background/Pistol_color.jpg", "LINEAR"),
      }),

      gun: new Material(new defs.Textured_Phong(), {
        ambient: 0.7,
        diffusivity: 1,
        specularity: 1,
        color: hex_color("#222222"),
        texture: new Texture("assets/background/gun_texture_2.jpg", "LINEAR"),
      }),
      gun2: new Material(new defs.Phong_Shader(), {
        ambient: 0.5,
        diffusivity: 0.8,
        specularity: 1,
        color: hex_color("#f55a00"),
      }),
      gun3: new Material(new defs.Phong_Shader(), {
        ambient: 0.7,
        diffusivity: 0.9,
        specularity: 0.2,
        color: hex_color("#333333"),
      }),

      crates: new Material(new defs.Phong_Shader(), {
        ambient: 1,
        diffusivity: 1,
        specularity: 1,
        color: hex_color("#594231"),
      }),
      roof: new Material(new defs.Phong_Shader(), {
        ambient: 1,
        diffusivity: 1,
        color: hex_color("#401C1B"),
      }),
      bullet: new Material(new defs.Phong_Shader(), {
        ambient: 1,
        diffusivity: 1,
        specularity: 0.2,
        color: hex_color("#212121"),
      }),
      sky: new Material(new Texture_Scroll_X(), {
        color: hex_color("#8CBDD6"),
        ambient: 0.25,
        diffusivity: 0.5,
        specularity: 0.5,
        texture: new Texture("assets/background/sky.jpg", "LINEAR"),
      }),
      wall_texture: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 1,
        specularity: 0.8,
        diffusivity: 0.8,
        texture: new Texture("assets/background/Dirty_Concrete.png", "LINEAR"),
      }),
      floor_texture: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 0.8,
        specularity: 0.5,
        diffusivity: 0.5,
        texture: new Texture("assets/background/Dirty_Concrete.png", "LINEAR"),
      }),
      crates_texture: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 0.8,
        texture: new Texture("assets/background/crate.png", "LINEAR"),
      }),
      reverse_crate: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 0.8,
        texture: new Texture("assets/background/reverse-crate.png", "LINEAR"),
      }),
      locked_box: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 0.8,
        texture: new Texture("assets/background/locked-box.png", "LINEAR"),
      }),
      shooting_guide: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 1,
        texture: new Texture("assets/background/shooting.png", "LINEAR"),
      }),
      wood_plank: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 1,
        texture: new Texture("assets/background/wood-plank.jpg"),
      }),
      warning_sign: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 1,
        texture: new Texture("assets/background/warning-sign.png", "LINEAR"),
      }),
      big_grass: new Material(new defs.Phong_Shader(), {
        color: hex_color("#244a2b"),
        ambient: 1,
        diffusivity: 1,
      }),
      dying_grass: new Material(new defs.Phong_Shader(), {
        color: hex_color("#785d32"),
        ambient: 1,
        diffusivity: 1,
      }),
      small_grass: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 0.3,
        texture: new Texture("assets/background/grass-image.png", "LINEAR"),
      }),

      // spike materials
      spike: new Material(new defs.Phong_Shader(), {
        ambient: 0.2,
        diffusivity: 0.8,
        color: hex_color("#2f3333"),
      }),

      spike_aura: new Material(new defs.Phong_Shader(), {
        ambient: 1,
        diffusivity: 0.8,
        specularity: 0,
        color: color(0.47, 1, 1, 0.92),
      }),

      spike_handle: new Material(new defs.Phong_Shader(), {
        ambient: 0.2,
        diffusivity: 0.8,
        color: hex_color("#2f3333"),
      }),

      // target materials
      dark_gray: new Material(new defs.Textured_Phong(), {
        ambient: 0.2,
        diffusivity: 0.8,
        specularity: 0.4,
        color: hex_color("#4a4b4d"),
        texture: new Texture(
          "assets/background/target_dark_gray.jpg",
          "LINEAR"
        ),
      }),
      gray: new Material(new defs.Textured_Phong(), {
        ambient: 0.2,
        diffusivity: 0.8,
        specularity: 0.4,
        color: hex_color("#989a9c"),
        texture: new Texture("assets/background/target_gray.jpg", "LINEAR"),
      }),

      // Currently use untextured shape
      untextured_gray: new Material(new defs.Phong_Shader(), {
        ambient: 0.2,
        diffusivity: 0.8,
        specularity: 0.4,
        color: hex_color("#989a9c"),
      }),

      wooden: new Material(new defs.Textured_Phong(), {
        ambient: 0.5,
        diffusivity: 0.5,
        specularity: 0.5,
        color: hex_color("#000000"),
        texture: new Texture("assets/background/wooden.jpeg", "LINEAR"),
      }),

      concrete: new Material(new defs.Textured_Phong(), {
        ambient: 0.7,
        diffusivity: 0.3,
        specularity: 0.1,
        color: hex_color("#000000"),
        texture: new Texture("assets/background/pillar_concrete.jpg", "LINEAR"),
      }),

      steel_beam: new Material(new defs.Textured_Phong(), {
        ambient: 0.4,
        diffusivity: 0.1,
        specularity: 0.1,
        color: hex_color("#000000"),
        texture: new Texture("assets/background/steel_beam.jpg", "LINEAR"),
      }),

      wood_board: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 0.8,
        diffusivity: 0.5,
        specularity: 0.5,
        texture: new Texture("assets/background/woodBoardTex.jpeg", "LINEAR"),
      }),

      floor_strip: new Material(new defs.Phong_Shader(), {
        color: hex_color("#ffffff"),
        ambient: 1,
      }),

      // spray paints 
      lobster_spray: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 1,
        texture: new Texture("assets/background/lobster_spray.png", "LINEAR"),
      }),

      val_spray: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 1,
        texture: new Texture("assets/background/val_spray.png", "LINEAR"),
      }),

      boom_spray: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 1,
        texture: new Texture("assets/background/boom_spray.png", "LINEAR"),
      }),

      duck_spray: new Material(new defs.Textured_Phong(), {
        color: hex_color("#000000"),
        ambient: 1,
        texture: new Texture("assets/background/duck_spray.png", "LINEAR"),
      }),

    };



    // Sound effects
    // this.gun_with_ammo = new Audio("assets/sounds/gun_with_ammo.mp3");
    // this.laser = new Audio("assets/sounds/laser.mp3");
    // this.water_drop = new Audio("assets/sounds/bloop.mp3");
    // this.quite_shot = new Audio("assets/sounds/quite_gun.mp3");
    // this.shatter = new Audio("assets/sounds/shatter.mp3");
    // this.first_hit = new Audio("assets/sounds/first_kill.mp3");
    // this.second_hit = new Audio("assets/sounds/second_kill.mp3");
    // this.third_hit = new Audio("assets/sounds/third_kill.mp3");
    // this.fourth_hit = new Audio("assets/sounds/fourth_kill.mp3");
    // this.fifth_hit = new Audio("assets/sounds/fifth_kill.mp3");
    // this.spectrum = new Audio("assets/sounds/spectrum_valorant.mp3");

    // Used for difficulty
    // Set the radius size of targets
    this.difficulty = config["difficulty"];
    if (this.difficulty == "easy") {
      this.target_r = 1.5;
    } else if (this.difficulty == "medium") {
      this.target_r = 1.25;
    } else {
      this.target_r = 0.75;
    }

    // Number of Targets
    this.target_num = config["scatter"];

    // Strafing
    this.strafe = config["strafe"];
    this.move_factor = 0;
    if (this.strafe) {
      this.move_factor = 2;
      if (this.target_num == 5) {
        if (this.difficulty == "medium") this.move_factor = 1;
        else if (this.difficulty == "easy") {
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
    this.cont_hits_2 = 0;
    this.cont_misses = 0;

    // Point system
    this.points = 0;

    // Accuracy
    this.hits = 0;
    this.total_shots = 0;
    this.accuracy = 100;

    // Testing
    this.recoil_counter = 0;

    // Timer
    this.timer = config["timer"];
    // this.timer = 5;
    this.time = 0;

    // Use a constant offset value to solve start time issue (very useful apparently!)
    this.iter = 0;

    // to be ran once
    this.init = false;

    // pregame time offset in number of frames (3 seconds * 60 frames)
    this.frames_offset = 3 * 60;

    // determine whether we should render certain models
    this.game_end = false;

    // interative plank
    this.plank_shot = false;
    this.plank_init = false;

    this.view_dist = 20;

    // bullet tracers
    this.bullet_tracer_queue = [];

    this.initial_camera_location = Mat4.look_at(
      vec3(0, 0, this.view_dist),
      vec3(0, 0, 0),
      vec3(0, 1, 0)
    );
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

  // Background functions
  draw_props2(context, program_state) {
    // let barrel_trans = Mat4.identity()
    //   .times(Mat4.translation(-10, -3.5, -5))
    //   .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
    //   .times(Mat4.scale(1, 1, 3));
    // this.shapes.rounded_uncapped_cylinder.draw(
    //   context,
    //   program_state,
    //   barrel_trans,
    //   this.materials.barrel
    // );
    // let barrel_trans2 = Mat4.identity()
    //   .times(Mat4.translation(-10, -4.8, -5))
    //   .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
    //   .times(Mat4.scale(1.05, 1.05, 0.15));
    // this.shapes.rounded_uncapped_cylinder.draw(
    //   context,
    //   program_state,
    //   barrel_trans2,
    //   this.materials.dark_gray
    // );
    // let barrel_trans3 = Mat4.identity()
    //   .times(Mat4.translation(-10, -2.02, -5))
    //   .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
    //   .times(Mat4.scale(1.01, 1.01, 0.08));
    // this.shapes.rounded_uncapped_cylinder.draw(
    //   context,
    //   program_state,
    //   barrel_trans3,
    //   this.materials.gray
    // );
    // let barrel_trans4 = Mat4.identity()
    //   .times(Mat4.translation(-10.5, -1.9, -5))
    //   .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
    //   .times(Mat4.scale(0.1, 0.1, 0.1));
    // this.shapes.rounded_capped_cylinder.draw(
    //   context,
    //   program_state,
    //   barrel_trans4,
    //   this.materials.dark_gray.override({ ambient: 0.7 })
    // );
    // let barrel_trans5 = Mat4.identity()
    //   .times(Mat4.translation(-10, -2, -5))
    //   .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
    //   .times(Mat4.scale(1.0, 1.0, 0.05));
    // this.shapes.rounded_capped_cylinder.draw(
    //   context,
    //   program_state,
    //   barrel_trans5,
    //   this.materials.barrel
    // );

    // second barrel
    let barrel2_trans = Mat4.identity()
      .times(Mat4.translation(11, -3.5, -7))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(1, 1, 3));
    this.shapes.rounded_uncapped_cylinder.draw(
      context,
      program_state,
      barrel2_trans,
      this.materials.barrel
    );
    let barrel2_trans2 = Mat4.identity()
      .times(Mat4.translation(11, -4.8, -7))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(1.01, 1.01, 0.15));
    this.shapes.rounded_uncapped_cylinder.draw(
      context,
      program_state,
      barrel2_trans2,
      this.materials.dark_gray
    );
    let barrel2_trans3 = Mat4.identity()
      .times(Mat4.translation(11, -2.02, -7))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(1.01, 1.01, 0.08));
    this.shapes.rounded_uncapped_cylinder.draw(
      context,
      program_state,
      barrel2_trans3,
      this.materials.gray
    );
    let barrel2_trans4 = Mat4.identity()
      .times(Mat4.translation(10.5, -1.9, -7))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(0.1, 0.1, 0.1));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      barrel2_trans4,
      this.materials.dark_gray.override({ ambient: 0.7 })
    );
    let barrel2_trans5 = Mat4.identity()
      .times(Mat4.translation(11, -2, -7))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(1.0, 1.0, 0.05));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      barrel2_trans5,
      this.materials.barrel
    );

    // second barrel
    let barrel_loc = Mat4.translation(5, 0, 7.3);
    let barrel3_trans = barrel_loc
      .times(Mat4.translation(11, -3.5, -7))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(1, 1, 2.8));
    this.shapes.rounded_uncapped_cylinder.draw(
      context,
      program_state,
      barrel3_trans,
      this.materials.barrel
    );
    let barrel3_trans2 = barrel_loc
      .times(Mat4.translation(11, -4.8, -7))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(1.01, 1.01, 0.15));
    this.shapes.rounded_uncapped_cylinder.draw(
      context,
      program_state,
      barrel3_trans2,
      this.materials.dark_gray
    );
    let barrel3_trans3 = barrel_loc
      .times(Mat4.translation(11, -2.02, -7))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(1.01, 1.01, 0.08));
    this.shapes.rounded_uncapped_cylinder.draw(
      context,
      program_state,
      barrel3_trans3,
      this.materials.gray
    );
    let barrel3_trans4 = barrel_loc
      .times(Mat4.translation(10.5, -1.9, -7))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(0.1, 0.1, 0.1));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      barrel3_trans4,
      this.materials.dark_gray.override({ ambient: 0.7 })
    );
    let barrel3_trans5 = barrel_loc
      .times(Mat4.translation(11, -2, -7))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(1.0, 1.0, 0.05));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      barrel3_trans5,
      this.materials.barrel
    );

    let plank_random_transform = Mat4.translation(15.4, -3, 2.6)
      .times(Mat4.rotation(Math.PI / 24, 0, 0, 1))
      .times(Mat4.rotation(-Math.PI / 24, 1, 0, 0))
      .times(Mat4.scale(0.3, 2, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      plank_random_transform,
      this.materials.wood_board.override({ ambient: 0.6, specularity: 1 })
    );
  }

  draw_floor(context, program_state) {
    let floor_transform = Mat4.identity();
    floor_transform = floor_transform
      .times(Mat4.translation(0, -this.view_dist / 4, 0)) // floor is at y = -5
      .times(Mat4.scale(20, 0.2, 20));
    this.shapes.floor.draw(
      context,
      program_state,
      floor_transform,
      this.materials.floor_texture
    );

    let floorDiagonal = Mat4.identity()
      .times(Mat4.translation(-10.5, -4.8, -17))
      .times(Mat4.rotation(Math.PI / 10, 0, 1, 0))
      .times(Mat4.scale(0.08, 0.3, 57));
    this.shapes.capped_cylinder.draw(
      context,
      program_state,
      floorDiagonal,
      this.materials.floor_strip
    );
    let floorDiagonal2 = Mat4.identity()
      .times(Mat4.translation(10.5, -4.8, -17))
      .times(Mat4.rotation(-Math.PI / 10, 0, 1, 0))
      .times(Mat4.scale(0.08, 0.3, 57));
    this.shapes.capped_cylinder.draw(
      context,
      program_state,
      floorDiagonal2,
      this.materials.floor_strip
    );
    let floorDiagonal3 = Mat4.identity()
      .times(Mat4.translation(-10.5, -4.9, -17))
      .times(Mat4.rotation(Math.PI / 10, 0, 1, 0))
      .times(Mat4.scale(0.1, 0.3, 57));
    this.shapes.cube.draw(
      context,
      program_state,
      floorDiagonal3,
      this.materials.spike_aura.override({ ambient: 0.6 })
    );
    let floorDiagonal4 = Mat4.identity()
      .times(Mat4.translation(10.5, -4.9, -17))
      .times(Mat4.rotation(-Math.PI / 10, 0, 1, 0))
      .times(Mat4.scale(0.1, 0.3, 57));
    this.shapes.cube.draw(
      context,
      program_state,
      floorDiagonal4,
      this.materials.spike_aura.override({ ambient: 0.6 })
    );
    let floorDiagonal5 = Mat4.identity()
      .times(Mat4.translation(-10.45, -5, -17))
      .times(Mat4.rotation(Math.PI / 10, 0, 1, 0))
      .times(Mat4.scale(0.2, 0.3, 57));
    this.shapes.cube.draw(
      context,
      program_state,
      floorDiagonal5,
      this.materials.dark_gray
    );
    let floorDiagonal6 = Mat4.identity()
      .times(Mat4.translation(10.45, -5, -17))
      .times(Mat4.rotation(-Math.PI / 10, 0, 1, 0))
      .times(Mat4.scale(0.2, 0.3, 57));
    this.shapes.cube.draw(
      context,
      program_state,
      floorDiagonal6,
      this.materials.dark_gray
    );
  }

  draw_walls(context, program_state) {
    /*
    let left_wall_transform = Mat4.identity();
    left_wall_transform = left_wall_transform
    .times(Mat4.translation(-18, 0, 0))
      .times(Mat4.scale(0.2, 10, 18))
      .times(Mat4.rotation(-1.5, 0, 1, 0));
    this.shapes.wall.draw(
      context,
      program_state,
      left_wall_transform,
      this.materials.wall_texture
    );
    */

    let left_wall_1_transform = Mat4.identity();
    left_wall_1_transform = left_wall_1_transform
      .times(Mat4.translation(-18, 0, -16))
      .times(Mat4.scale(0.2, 10, 4))
      .times(Mat4.rotation(-1.5, 0, 1, 0));

    this.shapes.cube.draw(
      context,
      program_state,
      left_wall_1_transform,
      this.materials.wall_texture
    );

    let left_wall_2_transform = Mat4.identity();
    left_wall_2_transform = left_wall_2_transform
      .times(Mat4.translation(-18, 0, 6))
      .times(Mat4.scale(0.2, 10, 12))
      .times(Mat4.rotation(-1.5, 0, 1, 0));
    this.shapes.cube.draw(
      context,
      program_state,
      left_wall_2_transform,
      this.materials.wall_texture
    );

    let left_wall_3_transform = left_wall_1_transform;
    left_wall_3_transform = left_wall_3_transform
      .times(Mat4.rotation(1.57, 0, 1, 0))
      .times(Mat4.translation(0, -0.6, 2))
      .times(Mat4.scale(1, 0.5, 6.5))
      .times(Mat4.rotation(-1.57, 0, 1, 0));
    this.shapes.cube.draw(
      context,
      program_state,
      left_wall_3_transform,
      this.materials.wall_texture
    );

    let left_wall_4_transform = left_wall_3_transform
      .times(Mat4.scale(1, 0.4, 1))
      .times(Mat4.translation(0, 7, 0));
    this.shapes.cube.draw(
      context,
      program_state,
      left_wall_4_transform,
      this.materials.wall_texture
    );

    let right_wall_transform = Mat4.identity();

    right_wall_transform = right_wall_transform
      .times(Mat4.translation(18, 0, 0))
      .times(Mat4.scale(0.2, 10, 18))
      .times(Mat4.rotation(1.5, 0, 1, 0));
    this.shapes.wall.draw(
      context,
      program_state,
      right_wall_transform,
      this.materials.wall_texture
    );

    let back_wall_transform = Mat4.identity();
    back_wall_transform = back_wall_transform
      .times(Mat4.translation(0, 0, -18))
      .times(Mat4.scale(20, 10, 0.2));
    this.shapes.wall.draw(
      context,
      program_state,
      back_wall_transform,
      this.materials.wall_texture
    );
  }

  draw_backWindow(context, program_state) {
    let window_translation = Mat4.translation(4.5, 0, 0).times(
      Mat4.scale(0.9, 0.9, 1)
    );
    let windowTop_trans = window_translation
      .times(Mat4.translation(0, 4, -17.5))
      .times(Mat4.scale(2.5, 3, 1));
    this.shapes.circle.draw(
      context,
      program_state,
      windowTop_trans,
      this.materials.bullet
    );
    let windowSquare_trans = window_translation
      .times(Mat4.translation(0, 2, -17.5))
      .times(Mat4.scale(2.41, 3, 1));
    this.shapes.square.draw(
      context,
      program_state,
      windowSquare_trans,
      this.materials.bullet
    );
    let windowTop_sky = window_translation
      .times(Mat4.translation(0, 4, -16.5))
      .times(Mat4.scale(2, 2.5, 1));
    this.shapes.circle.draw(
      context,
      program_state,
      windowTop_sky,
      this.materials.sky
    );
    let windowSquare_sky = window_translation
      .times(Mat4.translation(0, 2, -16.5))
      .times(Mat4.scale(2, 2.5, 1));
    this.shapes.square.draw(
      context,
      program_state,
      windowSquare_sky,
      this.materials.sky
    );

    let windowBigBoard = window_translation
      .times(Mat4.translation(0, 3, -16.4))
      .times(Mat4.rotation(-Math.PI / 2.1, 0, 0, 1))
      .times(Mat4.scale(1.75, 3, 0.2));
    this.shapes.cube.draw(
      context,
      program_state,
      windowBigBoard,
      this.materials.wood_board
    );

    let bolt_trans = window_translation
      .times(Mat4.translation(-2.8, 4, -16.1))
      .times(Mat4.scale(0.1, 0.1, 0.05));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_trans,
      this.materials.bullet.override({ ambient: 0.1, diffusivity: 0.2 })
    );
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_trans.times(Mat4.translation(53, 5, 0)),
      this.materials.bullet.override({ ambient: 0.1, diffusivity: 0.2 })
    );
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_trans.times(Mat4.translation(55, -23, 0)),
      this.materials.bullet.override({ ambient: 0.1, diffusivity: 0.2 })
    );
    // this.shapes.rounded_capped_cylinder.draw(
    //   context,
    //   program_state,
    //   bolt_trans.times(Mat4.translation(2, -26, 0)),
    //   this.materials.bullet.override({ ambient: 0.1, diffusivity: 0.2 })
    // );

    let bolt_size = Mat4.scale(0.08, 0.08, 0.05);

    let bolt_11_transform = Mat4.translation(-2, -0.34, -16.1)
      .times(window_translation)
      .times(bolt_size);
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_11_transform,
      this.materials.bullet.override({ ambient: 0.1, diffusivity: 0.2 })
    );

    let bolt_12_transform = Mat4.translation(-2, 0.27, -16.1)
      .times(window_translation)
      .times(bolt_size);
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_12_transform,
      this.materials.bullet.override({ ambient: 0.1, diffusivity: 0.2 })
    );

    let bolt_13_transform = Mat4.translation(2, -0.26, -16.1)
      .times(window_translation)
      .times(bolt_size);
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_13_transform,
      this.materials.bullet.override({ ambient: 0.1, diffusivity: 0.2 })
    );

    let bolt_14_transform = Mat4.translation(2, 0.35, -16)
      .times(window_translation)
      .times(bolt_size);
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_14_transform,
      this.materials.bullet.override({ ambient: 0.1, diffusivity: 0.2 })
    );

    let bolt_15_transform = Mat4.translation(2, 5, -16.1)
      .times(window_translation)
      .times(bolt_size);
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_15_transform,
      this.materials.bullet.override({ ambient: 0.1, diffusivity: 0.2 })
    );

    let bolt_16_transform = Mat4.translation(-2, 5.1, -16.1)
      .times(window_translation)
      .times(bolt_size);
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_16_transform,
      this.materials.bullet.override({ ambient: 0.1, diffusivity: 0.2 })
    );

    let bolt_17_transform = Mat4.translation(-2, 4.6, -16.1)
      .times(window_translation)
      .times(bolt_size);
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_17_transform,
      this.materials.bullet.override({ ambient: 0.1, diffusivity: 0.2 })
    );

    let bolt_18_transform = Mat4.translation(-2, 1.4, -16)
      .times(window_translation)
      .times(bolt_size);
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_18_transform,
      this.materials.bullet.override({ ambient: 0.1, diffusivity: 0.2 })
    );

    let bolt_19_transform = Mat4.translation(-2.1, 0.9, -16)
      .times(window_translation)
      .times(bolt_size);
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_19_transform,
      this.materials.bullet.override({ ambient: 0.1, diffusivity: 0.2 })
    );

    let windowPlanks = window_translation
      .times(Mat4.translation(0, 5.4, -16.3))
      .times(Mat4.rotation(Math.PI / 2.02, 0, 0, 1))
      .times(Mat4.scale(0.5, 2.5, 0.2));
    this.shapes.cube.draw(
      context,
      program_state,
      windowPlanks,
      this.materials.wood_plank.override({ ambient: 0.7 })
    );

    let windowPlanks2 = window_translation
      .times(Mat4.translation(0, 0, -16.3))
      .times(Mat4.rotation(-Math.PI / 2.02, 0, 0, 1))
      .times(Mat4.scale(0.5, 2.5, 0.2));
    this.shapes.cube.draw(
      context,
      program_state,
      windowPlanks2,
      this.materials.wood_plank.override({ ambient: 0.7 })
    );

    let windowPlanks3 = window_translation
      .times(Mat4.translation(0, 1, -16.2))
      .times(Mat4.rotation(Math.PI / 2.2, 0, 0, 1))
      .times(Mat4.scale(0.5, 2.5, 0.2));
    this.shapes.cube.draw(
      context,
      program_state,
      windowPlanks3,
      this.materials.wood_plank.override({ ambient: 0.55 })
    );
  }

  draw_pillars(context, program_state) {
    let leftPillar_trans = Mat4.identity().times(
      Mat4.translation(-10.5, 0, -17.5).times(Mat4.scale(0.75, 10, 0.5))
    );
    this.shapes.cube.draw(
      context,
      program_state,
      leftPillar_trans,
      this.materials.wooden
    );
    let leftPillar_base_trans = leftPillar_trans
      .times(Mat4.translation(0, -0.4, 1))
      .times(Mat4.scale(1.4, 0.15, 1.2));
    this.shapes.cube.draw(
      context,
      program_state,
      leftPillar_base_trans,
      this.materials.concrete
    );
    let leftPillar_base_2_trans = leftPillar_trans
      .times(Mat4.translation(0, -0.5, 1))
      .times(Mat4.scale(1.6, 0.08, 1.3));
    this.shapes.cube.draw(
      context,
      program_state,
      leftPillar_base_2_trans,
      this.materials.concrete
    );

    // angled block
    let leftPillar_2_trans = Mat4.identity()
      .times(Mat4.translation(-10.5, 5, -17))
      .times(Mat4.rotation(Math.PI / 3, 1, 0, 0))
      .times(Mat4.scale(0.5, 8.5, 0.5));
    this.shapes.cube.draw(
      context,
      program_state,
      leftPillar_2_trans,
      this.materials.wooden
    );
    // long into camera block
    let leftPillar_3_trans = Mat4.identity()
      .times(Mat4.translation(-10.5, 9.25, -17))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(0.75, 18, 0.75));
    this.shapes.cube.draw(
      context,
      program_state,
      leftPillar_3_trans,
      this.materials.wooden
    );
    let rightPillar_trans = Mat4.identity()
      .times(Mat4.translation(10.5, 0, -17.5))
      .times(Mat4.scale(0.75, 10, 0.5));
    this.shapes.cube.draw(
      context,
      program_state,
      rightPillar_trans,
      this.materials.wooden
    );

    let rightPillar_base_trans = rightPillar_trans
      .times(Mat4.translation(0, -0.4, 1))
      .times(Mat4.scale(1.4, 0.15, 1.2));
    this.shapes.cube.draw(
      context,
      program_state,
      rightPillar_base_trans,
      this.materials.concrete
    );
    let rightPillar_base_2_trans = rightPillar_trans
      .times(Mat4.translation(0, -0.5, 1))
      .times(Mat4.scale(1.6, 0.08, 1.3));
    this.shapes.cube.draw(
      context,
      program_state,
      rightPillar_base_2_trans,
      this.materials.concrete
    );

    // angled block
    let rightPillar_2_trans = Mat4.identity()
      .times(Mat4.translation(10.5, 5, -17))
      .times(Mat4.rotation(Math.PI / 3, 1, 0, 0))
      .times(Mat4.scale(0.5, 8.5, 0.5));
    this.shapes.cube.draw(
      context,
      program_state,
      rightPillar_2_trans,
      this.materials.wooden
    );
    // long into camera block
    let rightPillar_3_trans = Mat4.identity()
      .times(Mat4.translation(10.5, 9.25, -17))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(0.75, 18, 0.75));
    this.shapes.cube.draw(
      context,
      program_state,
      rightPillar_3_trans,
      this.materials.wooden
    );

    // horizontal block
    let horizPillar_trans = Mat4.identity()
      .times(Mat4.translation(0, 9.55, -17))
      .times(Mat4.rotation(Math.PI / 2, 0, 0, 1))
      .times(Mat4.scale(0.75, 20, 0.75));
    this.shapes.cube.draw(
      context,
      program_state,
      horizPillar_trans,
      this.materials.wooden
    );

    let horizPillar_2_trans = Mat4.identity()
      .times(Mat4.translation(0, 9.55, -6))
      .times(Mat4.rotation(Math.PI / 2, 0, 0, 1))
      .times(Mat4.scale(0.75, 20, 0.75));
    this.shapes.cube.draw(
      context,
      program_state,
      horizPillar_2_trans,
      this.materials.wooden
    );

    // steel beams
    let Beam_left_trans = Mat4.identity()
      .times(Mat4.translation(-18.2, 10.55, -17))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(0.4, 18, 0.4));
    this.shapes.cube.draw(
      context,
      program_state,
      Beam_left_trans,
      this.materials.steel_beam
    );

    let Beam_right_trans = Mat4.identity()
      .times(Mat4.translation(18.2, 10.55, -17))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(0.4, 18, 0.4));
    this.shapes.cube.draw(
      context,
      program_state,
      Beam_right_trans,
      this.materials.steel_beam
    );

    let horizBeam_trans = Mat4.identity()
      .times(Mat4.translation(0, 10.55, -18))
      .times(Mat4.rotation(Math.PI / 2, 0, 0, 1))
      .times(Mat4.scale(0.4, 18, 0.4));
    this.shapes.cube.draw(
      context,
      program_state,
      horizBeam_trans,
      this.materials.steel_beam
    );

    let horizBeam_left_trans = Mat4.identity()
      .times(Mat4.translation(-18.25, 9.5, -17.2))
      .times(Mat4.scale(0.7, 1, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      horizBeam_left_trans,
      this.materials.steel_beam
    );

    let horizBeam_left_2_trans = Mat4.identity()
      .times(Mat4.translation(-18.25, 9.5, -6))
      .times(Mat4.scale(0.7, 1, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      horizBeam_left_2_trans,
      this.materials.steel_beam
    );

    let horizBeam_right_trans = Mat4.identity()
      .times(Mat4.translation(18.25, 9.5, -17.2))
      .times(Mat4.scale(0.7, 1, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      horizBeam_right_trans,
      this.materials.steel_beam
    );

    let horizBeam_right_2_trans = Mat4.identity()
      .times(Mat4.translation(18.25, 9.5, -6))
      .times(Mat4.scale(0.7, 1, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      horizBeam_right_2_trans,
      this.materials.steel_beam
    );

    // tilted pillars
    let left_support_pillar_trans = Mat4.translation(-8, 8, -17.5)
      .times(Mat4.rotation(-Math.PI / 4, 0, 0, 1))
      .times(Mat4.scale(0.3, 3, 0.3));
    this.shapes.cube.draw(
      context,
      program_state,
      left_support_pillar_trans,
      this.materials.wooden
    );

    let right_support_pillar_trans = Mat4.translation(8, 8, -17.5)
      .times(Mat4.rotation(Math.PI / 4, 0, 0, 1))
      .times(Mat4.scale(0.3, 3, 0.3));
    this.shapes.cube.draw(
      context,
      program_state,
      right_support_pillar_trans,
      this.materials.wooden
    );

    // steel scaffold
    let steelBeam_trans = Mat4.identity()
      .times(Mat4.translation(7, 9.5, -11))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(0.15, 4.3, 0.75));
    this.shapes.cube.draw(
      context,
      program_state,
      steelBeam_trans,
      this.materials.steel_beam
    );
    this.shapes.cube.draw(
      context,
      program_state,
      steelBeam_trans.times(Mat4.translation(-90, 0, 0)),
      this.materials.steel_beam
    );
    let steelBeam_diagonal = Mat4.identity()
      .times(Mat4.translation(-6.8, 9.5, -16.5))
      .times(Mat4.rotation(Math.PI / 4, 0, 1, 0))
      .times(Mat4.scale(0.15, 0.6, 14));
    this.shapes.cube.draw(
      context,
      program_state,
      steelBeam_diagonal,
      this.materials.steel_beam
    );
    let steelBeam_diagonal2 = Mat4.identity()
      .times(Mat4.translation(7.3, 9.5, -16.5))
      .times(Mat4.rotation(-Math.PI / 4, 0, 1, 0))
      .times(Mat4.scale(0.15, 0.6, 14));
    this.shapes.cube.draw(
      context,
      program_state,
      steelBeam_diagonal2,
      this.materials.steel_beam
    );
    // steel supports
    let steelSupport = Mat4.identity()
      .times(Mat4.translation(-10.5, 5, -17.5))
      .times(Mat4.scale(0.6, 0.5, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      steelSupport,
      this.materials.steel_beam
    );
    let steelSupport2 = Mat4.identity()
      .times(Mat4.translation(-10.5, 5.3, -15.5))
      .times(Mat4.rotation(-Math.PI / 6, 1, 0, 0))
      .times(Mat4.scale(0.4, 0.2, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      steelSupport2,
      this.materials.steel_beam
    );
    let steelSupportR = Mat4.identity()
      .times(Mat4.translation(10.5, 5, -17.5))
      .times(Mat4.scale(0.6, 0.5, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      steelSupportR,
      this.materials.steel_beam
    );
    let steelSupportR2 = Mat4.identity()
      .times(Mat4.translation(10.5, 5.3, -15.5))
      .times(Mat4.rotation(-Math.PI / 6, 1, 0, 0))
      .times(Mat4.scale(0.4, 0.2, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      steelSupportR2,
      this.materials.steel_beam
    );
    let steelSupportT = Mat4.identity()
      .times(Mat4.translation(10.5, 8.9, -9.5))
      .times(Mat4.scale(0.7, 0.55, 0.5));
    this.shapes.cube.draw(
      context,
      program_state,
      steelSupportT,
      this.materials.steel_beam
    );
    let steelSupportT2 = Mat4.identity()
      .times(Mat4.translation(-10.5, 8.9, -9.5))
      .times(Mat4.scale(0.7, 0.55, 0.5));
    this.shapes.cube.draw(
      context,
      program_state,
      steelSupportT2,
      this.materials.steel_beam
    );
  }

  draw_props(context, program_state, t) {
    // Roof
    // let roof_trans = Mat4.identity();
    // roof_trans = roof_trans
    //   .times(Mat4.translation(13, 5, 5))
    //   .times(Mat4.rotation(2.3, 0, 0, 1))
    //   .times(Mat4.scale(0.25, 0.5, 7));
    // this.shapes.cube.draw(
    //   context,
    //   program_state,
    //   roof_trans,
    //   this.materials.roof
    // );

    // Crates

    let crate1_trans = Mat4.identity();
    crate1_trans = crate1_trans
      .times(Mat4.translation(-16, -3.5, -15))
      .times(Mat4.scale(1.5, 1.5, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      crate1_trans,
      this.materials.crates_texture
    );

    let crate2_trans = Mat4.identity();
    crate2_trans = crate2_trans
      .times(Mat4.translation(16, 1, -15.5))
      .times(Mat4.scale(1.5, 1.5, 1))
      .times(Mat4.rotation(-0.1, 0, 1, 0));
    this.shapes.cube.draw(
      context,
      program_state,
      crate2_trans,
      this.materials.crates_texture
    );

    let crate3_trans = Mat4.identity();
    crate3_trans = crate3_trans
      .times(Mat4.translation(15.5, 4, -15.5))
      .times(Mat4.scale(1.4, 1.4, 1))
      .times(Mat4.rotation(-0.9, 0, 1, 0));
    this.shapes.cube.draw(
      context,
      program_state,
      crate3_trans,
      this.materials.reverse_crate
    );

    let crate4_trans = Mat4.identity();
    crate4_trans = crate4_trans
      .times(Mat4.translation(-15, -3.5, -8))
      .times(Mat4.scale(1.4, 1.4, 1))
      .times(Mat4.rotation(-0.9, 0, 1, 0));
    this.shapes.cube.draw(
      context,
      program_state,
      crate4_trans,
      this.materials.reverse_crate
    );

    let crate5_trans = Mat4.identity()
      .times(Mat4.translation(15.5, -3.5, -3))
      .times(Mat4.scale(1.4, 1.4, 1))
      .times(Mat4.rotation(-0.3, 0, 1, 0));
    this.shapes.cube.draw(
      context,
      program_state,
      crate5_trans,
      this.materials.crates_texture
    );

    // Locked boxes
    /*
        let standing_block1_trans = Mat4.identity();
        standing_block1_trans = standing_block1_trans.times(Mat4.scale(2, 1.5, 1))
                                                   .times(Mat4.translation(2, -1.7, -1));
        this.shapes.cube.draw(context, program_state, standing_block1_trans, this.materials.locked_box);
        */
    let standing_block2_trans = Mat4.identity();
    standing_block2_trans = standing_block2_trans
      .times(Mat4.translation(15, -3, -16))
      .times(Mat4.scale(2.5, 2.5, 2.5));
    this.shapes.cube.draw(
      context,
      program_state,
      standing_block2_trans,
      this.materials.locked_box
    );
    let standing_block3_trans = Mat4.identity();
    standing_block3_trans = standing_block3_trans
      .times(Mat4.translation(16, -3.3, -10))
      .times(Mat4.scale(1.5, 1.5, 2));
    this.shapes.cube.draw(
      context,
      program_state,
      standing_block3_trans,
      this.materials.locked_box
    );

    // Bullets on the floor
    let bullet_body1_trans = Mat4.identity();
    bullet_body1_trans = bullet_body1_trans
      .times(Mat4.scale(0.125, 0.03125, 0.03125))
      .times(Mat4.translation(-27, -60, 470))
      .times(Mat4.rotation(-1.55, 0, 1, 0))
      .times(Mat4.scale(0.6, 0.6, 0.6));
    this.shapes.bullet_capped_cylinder.draw(
      context,
      program_state,
      bullet_body1_trans,
      this.materials.bullet
    );
    let bullet_head1_trans = bullet_body1_trans;
    bullet_head1_trans = bullet_head1_trans
      .times(Mat4.scale(1, 1, 1))
      .times(Mat4.translation(0, 0, -0.5));
    this.shapes.sphere.draw(
      context,
      program_state,
      bullet_head1_trans,
      this.materials.bullet
    );

    let bullet_body2_trans = Mat4.identity();
    bullet_body2_trans = bullet_body2_trans
      .times(Mat4.scale(0.25, 0.0625, 0.0625))
      .times(Mat4.translation(-25, -60, 135))
      .times(Mat4.rotation(2, 0, 1, 0))
      .times(Mat4.scale(0.6, 0.6, 0.6));
    this.shapes.bullet_capped_cylinder.draw(
      context,
      program_state,
      bullet_body2_trans,
      this.materials.bullet
    );
    let bullet_head2_trans = bullet_body2_trans;
    bullet_head2_trans = bullet_head2_trans
      .times(Mat4.scale(1, 1, 1))
      .times(Mat4.translation(0, 0, -0.5));
    this.shapes.sphere.draw(
      context,
      program_state,
      bullet_head2_trans,
      this.materials.bullet
    );

    let bullet_body3_trans = Mat4.identity();
    bullet_body3_trans = bullet_body3_trans
      .times(Mat4.scale(0.25, 0.0625, 0.0625))
      .times(Mat4.translation(-8, -58, 80))
      .times(Mat4.rotation(1, 0, 1, 0))
      .times(Mat4.scale(0.6, 0.6, 0.6));
    this.shapes.bullet_capped_cylinder.draw(
      context,
      program_state,
      bullet_body3_trans,
      this.materials.bullet
    );
    let bullet_head3_trans = bullet_body3_trans;
    bullet_head3_trans = bullet_head3_trans
      .times(Mat4.scale(1, 1, 1))
      .times(Mat4.translation(0, 0, -0.5));
    this.shapes.sphere.draw(
      context,
      program_state,
      bullet_head3_trans,
      this.materials.bullet
    );

    let bullet_body4_trans = Mat4.identity();
    bullet_body4_trans = bullet_body4_trans
      .times(Mat4.scale(0.25, 0.0625, 0.0625))
      .times(Mat4.translation(40, -58, 60))
      .times(Mat4.rotation(1.8, 0, 1, 0))
      .times(Mat4.scale(0.6, 0.6, 0.6));
    this.shapes.bullet_capped_cylinder.draw(
      context,
      program_state,
      bullet_body4_trans,
      this.materials.bullet
    );
    let bullet_head4_trans = bullet_body4_trans;
    bullet_head4_trans = bullet_head4_trans
      .times(Mat4.scale(1, 1, 1))
      .times(Mat4.translation(0, 0, -0.5));
    this.shapes.sphere.draw(
      context,
      program_state,
      bullet_head4_trans,
      this.materials.bullet
    );

    let bullet_body5_trans = Mat4.identity();
    bullet_body5_trans = bullet_body5_trans
      .times(Mat4.scale(0.25, 0.0625, 0.0625))
      .times(Mat4.translation(20, -58, 100))
      .times(Mat4.rotation(-2, 0, 1, 0))
      .times(Mat4.scale(0.6, 0.6, 0.6));
    this.shapes.bullet_capped_cylinder.draw(
      context,
      program_state,
      bullet_body5_trans,
      this.materials.bullet
    );
    let bullet_head5_trans = bullet_body5_trans;
    bullet_head5_trans = bullet_head5_trans
      .times(Mat4.scale(1, 1, 1))
      .times(Mat4.translation(0, 0, -0.5));
    this.shapes.sphere.draw(
      context,
      program_state,
      bullet_head5_trans,
      this.materials.bullet
    );

    let bullet_body6_trans = Mat4.identity();
    bullet_body6_trans = bullet_body6_trans
      .times(Mat4.scale(0.25, 0.0625, 0.0625))
      .times(Mat4.translation(32, -60, 160))
      .times(Mat4.rotation(-2.3, 0, 1, 0))
      .times(Mat4.scale(0.6, 0.6, 0.6));
    this.shapes.bullet_capped_cylinder.draw(
      context,
      program_state,
      bullet_body6_trans,
      this.materials.bullet
    );
    let bullet_head6_trans = bullet_body6_trans;
    bullet_head6_trans = bullet_head6_trans
      .times(Mat4.scale(1, 1, 1))
      .times(Mat4.translation(0, 0, -0.5));
    this.shapes.sphere.draw(
      context,
      program_state,
      bullet_head6_trans,
      this.materials.bullet
    );

    let bullet_body7_trans = Mat4.identity();
    bullet_body7_trans = bullet_body7_trans
      .times(Mat4.scale(0.25, 0.0625, 0.0625))
      .times(Mat4.translation(5, -60, 120))
      .times(Mat4.rotation(1.3, 0, 1, 0))
      .times(Mat4.scale(0.6, 0.6, 0.6));
    this.shapes.bullet_capped_cylinder.draw(
      context,
      program_state,
      bullet_body7_trans,
      this.materials.bullet
    );
    let bullet_head7_trans = bullet_body7_trans;
    bullet_head7_trans = bullet_head7_trans
      .times(Mat4.scale(1, 1, 1))
      .times(Mat4.translation(0, 0, -0.5));
    this.shapes.sphere.draw(
      context,
      program_state,
      bullet_head7_trans,
      this.materials.bullet
    );

    let bullet_body8_trans = Mat4.translation(3, 0, 0);
    bullet_body8_trans = bullet_body8_trans
      .times(Mat4.scale(0.125, 0.03125, 0.03125))
      .times(Mat4.translation(-27, -60, 470))
      .times(Mat4.rotation(-1.55, 0, 1, 0))
      .times(Mat4.scale(0.6, 0.6, 0.6));
    this.shapes.bullet_capped_cylinder.draw(
      context,
      program_state,
      bullet_body8_trans,
      this.materials.bullet
    );
    let bullet_head8_trans = bullet_body8_trans;
    bullet_head8_trans = bullet_head8_trans
      .times(Mat4.scale(1, 1, 1))
      .times(Mat4.translation(0, 0, -0.5));
    this.shapes.sphere.draw(
      context,
      program_state,
      bullet_head8_trans,
      this.materials.bullet
    );

    let bullet_body9_trans = Mat4.translation(5, 0, 0)
      .times(Mat4.scale(0.125, 0.03125, 0.03125))
      .times(Mat4.translation(-27, -60, 470))
      .times(Mat4.rotation(-1.55, 0, 1, 0))
      .times(Mat4.scale(0.6, 0.6, 0.6));
    this.shapes.bullet_capped_cylinder.draw(
      context,
      program_state,
      bullet_body8_trans,
      this.materials.bullet
    );
    let bullet_head9_trans = bullet_body9_trans
      .times(Mat4.scale(1, 1, 1))
      .times(Mat4.translation(0, 0, -0.5));
    this.shapes.sphere.draw(
      context,
      program_state,
      bullet_head9_trans,
      this.materials.bullet
    );

    let bullet_body10_trans = Mat4.translation(3.3, 0, -1.5)
      .times(Mat4.scale(0.125, 0.03125, 0.03125))
      .times(Mat4.translation(-27, -60, 470))
      .times(Mat4.rotation(-1.55, 0, 1, 0))
      .times(Mat4.scale(0.6, 0.6, 0.6));
    this.shapes.bullet_capped_cylinder.draw(
      context,
      program_state,
      bullet_body8_trans,
      this.materials.bullet
    );
    let bullet_head10_trans = bullet_body10_trans
      .times(Mat4.scale(1, 1, 1))
      .times(Mat4.translation(0, 0, -0.5));
    this.shapes.sphere.draw(
      context,
      program_state,
      bullet_head10_trans,
      this.materials.bullet
    );

    // Wall decor - shooting guide
    let shooting_guide_trans = Mat4.identity();
    shooting_guide_trans = shooting_guide_trans
      .times(Mat4.translation(17.5, 1, -10))
      .times(Mat4.rotation(1.55, 0, 1, 0))
      .times(Mat4.scale(2.5, 2.5, 1));
    this.shapes.square.draw(
      context,
      program_state,
      shooting_guide_trans,
      this.materials.shooting_guide
    );
    let shooting_guide2_trans = Mat4.identity();
    shooting_guide2_trans = shooting_guide2_trans
      .times(Mat4.translation(17.5, 1, -6))
      .times(Mat4.rotation(1.55, 0, 1, 0))
      .times(Mat4.scale(2.5, 2.5, 1));
    this.shapes.square.draw(
      context,
      program_state,
      shooting_guide2_trans,
      this.materials.shooting_guide
    );

    // spray paints
    let lobster_spray_transform = Mat4.translation(-4,0,-17.5)
      .times(Mat4.scale(4,4,1));
    this.shapes.square.draw(
      context, 
      program_state, 
      lobster_spray_transform, 
      this.materials.lobster_spray
    )

    let boom_spray_transform = Mat4.translation(0,-3,-17.5)
    .times(Mat4.scale(3,3,1));
  this.shapes.square.draw(
    context, 
    program_state, 
    boom_spray_transform, 
    this.materials.boom_spray.override({ambient: 0.7})
  )

  let val_spray_transform = Mat4.translation(14.5,7,-17.5)
    .times(Mat4.rotation(-Math.PI/10, 0,0,1))
    .times(Mat4.scale(1.3,1.3,1));
  this.shapes.square.draw(
    context, 
    program_state, 
    val_spray_transform, 
    this.materials.val_spray.override({ambient: 0.6})
  )
    

    // Window
    let window_transform = Mat4.identity();
    window_transform = window_transform
      .times(Mat4.translation(-18, 2.5, -9.5))
      .times(Mat4.scale(0.5, 4.9, 3.1))
      .times(Mat4.rotation((Math.PI / 180) * 90, 0, 1, 0))
      .times(Mat4.rotation((Math.PI / 180) * 45, 0, 0, 1))
      .times(Mat4.rotation((Math.PI / 180) * 1, 1, 0, 0));
    this.shapes.window_cylinder.draw(
      context,
      program_state,
      window_transform,
      this.materials.bullet
    );

    // random planks on left side
    let plank_random_transform = Mat4.translation(-16.2, -3, 0)
      .times(Mat4.rotation(Math.PI / 20, 0, 0, 1))
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
      .times(Mat4.scale(1, 1.8, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      plank_random_transform,
      this.materials.wooden.override({ ambient: 0.6, specularity: 1 })
    );

    let plank_random_2_transform = Mat4.translation(-16.5, -4.4, 0.5)
      .times(Mat4.rotation(Math.PI / 40, 0, 0, 1))
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
      .times(Mat4.scale(2.4, 0.4, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      plank_random_2_transform,
      this.materials.wood_plank
    );

    // let plank_random_3_transform = Mat4.translation(-16.2,-3,1.6)
    //   .times(Mat4.rotation(-Math.PI/40, 1,0,0))
    //   .times(Mat4.rotation(Math.PI/24, 0,0,1))
    //   .times(Mat4.rotation(Math.PI/4, 0,1,0))
    //   .times(Mat4.scale(0.25,3,0.05));
    //   this.shapes.cube.draw(
    //     context,
    //     program_state,
    //     plank_random_3_transform,
    //     this.materials.wooden
    //   );

    // middle planks
    let plank_random_4_transform = Mat4.translation(-8.6, -3, -16.5)
      .times(Mat4.rotation(Math.PI / 20, 0, 0, 1))
      .times(Mat4.rotation(Math.PI / 2.2, 0, 1, 0))
      .times(Mat4.scale(0.8, 3.5, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      plank_random_4_transform,
      this.materials.wood_plank
    );

    let plank_random_5_transform = Mat4.translation(-7.7, -3.5, -16.5)
      .times(Mat4.rotation(Math.PI / 18, 1, 0, 0))
      .times(Mat4.scale(0.4, 1.8, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      plank_random_5_transform,
      this.materials.wood_plank
    );

    // Wooden planks over window
    let plank_1_transform = Mat4.identity();
    plank_1_transform = plank_1_transform
      .times(Mat4.translation(-17.5, 0.5, -9))
      .times(Mat4.scale(0.1, 0.5, 2.5))
      .times(Mat4.rotation(-1.5, 0, 1, 0));
    this.shapes.cube.draw(
      context,
      program_state,
      plank_1_transform,
      this.materials.wood_plank
    );

    let plank_2_transform = plank_1_transform;
    plank_2_transform = plank_2_transform.times(Mat4.translation(0, 5.5, 0));
    this.shapes.cube.draw(
      context,
      program_state,
      plank_2_transform,
      this.materials.wood_plank
    );

    let plank_3_transform = plank_1_transform;
    plank_3_transform = plank_3_transform.times(Mat4.translation(0, 8, 0));
    this.shapes.cube.draw(
      context,
      program_state,
      plank_3_transform,
      this.materials.wood_plank
    );

    let bolt_1_transform = Mat4.identity();
    bolt_1_transform = bolt_1_transform
      .times(Mat4.translation(-16.9, 0.3, -6))
      .times(Mat4.rotation((Math.PI / 180) * 100, 0, 1, 0))
      .times(Mat4.scale(0.05, 0.05, 0.05));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_1_transform,
      this.materials.bullet
    );

    let bolt_2_transform = bolt_1_transform;
    bolt_2_transform = bolt_2_transform.times(Mat4.translation(0, 10, 0));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_2_transform,
      this.materials.bullet
    );

    let bolt_3_transform = bolt_1_transform;
    bolt_3_transform = bolt_3_transform
      .times(Mat4.rotation((Math.PI / 180) * -100, 0, 1, 0))
      .times(Mat4.translation(0, 0, -90));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_3_transform,
      this.materials.bullet
    );

    let bolt_4_transform = bolt_3_transform;
    bolt_4_transform = bolt_4_transform.times(Mat4.translation(0, 10, 0));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_4_transform,
      this.materials.bullet
    );

    let bolt_5_transform = bolt_1_transform;
    bolt_5_transform = bolt_5_transform.times(Mat4.translation(0, 53, 0));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_5_transform,
      this.materials.bullet
    );

    let bolt_6_transform = bolt_1_transform;
    bolt_6_transform = bolt_6_transform.times(Mat4.translation(0, 64, 0));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_6_transform,
      this.materials.bullet
    );

    let bolt_7_transform = bolt_3_transform;
    bolt_7_transform = bolt_7_transform.times(Mat4.translation(0, 53, 0));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_7_transform,
      this.materials.bullet
    );

    let bolt_8_transform = bolt_7_transform;
    bolt_8_transform = bolt_8_transform.times(Mat4.translation(0, 11, 0));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_8_transform,
      this.materials.bullet
    );

    let bolt_9_transform = bolt_6_transform;
    bolt_9_transform = bolt_9_transform.times(Mat4.translation(0, 14, 0));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_9_transform,
      this.materials.bullet
    );

    let bolt_10_transform = bolt_9_transform;
    bolt_10_transform = bolt_10_transform.times(Mat4.translation(0, 11, 0));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_10_transform,
      this.materials.bullet
    );

    let bolt_11_transform = bolt_8_transform;
    bolt_11_transform = bolt_11_transform.times(Mat4.translation(0, 14, 0));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_11_transform,
      this.materials.bullet
    );

    let bolt_12_transform = bolt_11_transform;
    bolt_12_transform = bolt_12_transform.times(Mat4.translation(0, 11, 0));
    this.shapes.rounded_capped_cylinder.draw(
      context,
      program_state,
      bolt_12_transform,
      this.materials.bullet
    );

    let spider_transform = Mat4.identity();
    spider_transform = spider_transform
      .times(Mat4.translation(-16 + t / 60, 8 - 6 * Math.sqrt(t / 90), -17.5))
      .times(Mat4.rotation(Math.sqrt(t / 90), 0, 0, 1))
      .times(Mat4.scale(0.15, 0.15, 0.15));
    this.shapes.spider.draw(
      context,
      program_state,
      spider_transform,
      this.materials.bullet
    );

    let spider_t = t-this.t_diff;
    let spider_2_transform = Mat4.translation(-18 + spider_t,-4,8)
      .times(Mat4.rotation(Math.PI/2 + 10*spider_t, 0, 1, 0))
      .times(Mat4.rotation(-Math.PI/2, 1, 0, 0))
      .times(Mat4.scale(0.15, 0.15, 0.15));
    this.shapes.spider.draw(
      context,
      program_state,
      spider_2_transform,
      this.materials.bullet
    );

    let grass_1_trans = Mat4.identity();
    grass_1_trans = grass_1_trans
      .times(Mat4.translation(-17.5, -4.5, -5))
      .times(Mat4.scale(0.5, 0.5, 0.5));
    this.shapes.grass.draw(
      context,
      program_state,
      grass_1_trans,
      this.materials.big_grass
    );

    let grass_2_trans = Mat4.identity();
    grass_2_trans = grass_2_trans
      .times(Mat4.translation(6, -4.5, -17.5))
      .times(Mat4.scale(0.5, 0.5, 0.5));
    this.shapes.grass.draw(
      context,
      program_state,
      grass_2_trans,
      this.materials.big_grass
    );

    let grass_3_trans = grass_2_trans;
    grass_3_trans = grass_3_trans.times(Mat4.translation(-25, -1, 0));
    this.shapes.grass.draw(
      context,
      program_state,
      grass_3_trans,
      this.materials.big_grass
    );

    let grass_4_transform = Mat4.translation(-4, -4.5, -17.5).times(
      Mat4.scale(0.8, 0.8, 1)
    );
    this.shapes.grass.draw(
      context,
      program_state,
      grass_4_transform,
      this.materials.big_grass
    );

    let grass_5_transform = Mat4.translation(17.5, -4.5, -8).times(
      Mat4.scale(0.3, 0.4, 0.65)
    );
    this.shapes.grass.draw(
      context,
      program_state,
      grass_5_transform,
      this.materials.big_grass
    );

    let grass_6_transform = Mat4.translation(-12.8, -4, -9).times(
      Mat4.scale(0.3, 0.4, 0.65)
    );
    this.shapes.grass.draw(
      context,
      program_state,
      grass_6_transform,
      this.materials.dying_grass
    );

    let grass_7_transform = Mat4.translation(-14, -4, -9.3).times(
      Mat4.scale(0.8, 0.4, 0.4)
    );
    this.shapes.grass.draw(
      context,
      program_state,
      grass_7_transform,
      this.materials.dying_grass
    );

    let grass_8_transform = Mat4.translation(-16.5, -4.2, -6.9).times(
      Mat4.scale(0.3, 0.6, 0.3)
    );
    this.shapes.grass.draw(
      context,
      program_state,
      grass_8_transform,
      this.materials.dying_grass
    );

    // let grass_4_trans = Mat4.identity();
    // grass_4_trans = grass_4_trans
    //   .times(Mat4.translation(-5, -4, -17.5))
    //   .times(Mat4.scale(1, 1, 1));
    // this.shapes.square.draw(
    //   context,
    //   program_state,
    //   grass_4_trans,
    //   this.materials.small_grass
    // );

    // let grass_5_trans = Mat4.identity();
    // grass_5_trans = grass_5_trans
    //   .times(Mat4.translation(17.5, -4, -6))
    //   .times(Mat4.rotation(Math.PI/180 * 7, 0, 0, 1))
    //   .times(Mat4.rotation(Math.PI/180 * 5, 1, 0, 0))
    //   .times(Mat4.scale(1, 1.5, 1));
    // this.shapes.square.draw(
    //   context,
    //   program_state,
    //   grass_5_trans,
    //   this.materials.small_grass
    // );
  }

  draw_sky(context, program_state) {
    let sky_transform = Mat4.scale(30, 22, 1).times(
      Mat4.translation(0, 0.7, -20)
    );
    this.shapes.cube.draw(
      context,
      program_state,
      sky_transform,
      this.materials.sky
    );
  }

  // Check if any of the targets are too close to each other
  target_collision(ranX, ranY) {
    for (let coord of this.target_locations) {
      let x = coord[0],
        y = coord[1];
      let dist = Math.sqrt((ranX - x) ** 2 + (ranY - y) ** 2);
      if (dist < 2 * this.target_r + 2.5) {
        // 2 times the radius + 2
        return true;
      }
      // 2 extra cases for strafing
      // min with max and max with min
      if (this.strafe) {
        let dist2 = Math.sqrt(
          (ranX - x + 2 * this.move_factor) ** 2 + (ranY - y) ** 2
        );
        let dist3 = Math.sqrt(
          (ranX - x - 2 * this.move_factor) ** 2 + (ranY - y) ** 2
        );
        if (dist2 < 2 * this.target_r + 2 || dist3 < 2 * this.target_r + 2) {
          // 2 times the radius + 2
          return true;
        }
      }
    }
    return false;
  }

  // Returns one random location that does not conflict with other targets
  generate_location() {
    let size_factor = 0;
    if (this.target_r == 1.5) {
      size_factor = 2;
    } else if (this.target_r == 1.25) {
      size_factor = 1;
    }
    let strafe_speed = 0;

    if (this.strafe) {
      strafe_speed = Math.random() * (Math.PI + Math.PI) + -Math.PI;
    }
    let xMin = -15 + size_factor + this.move_factor,
      xMax = 15 - size_factor - this.move_factor;
    let yMin = -2,
      yMax = 6 - size_factor - this.move_factor;

    // Generate random coordinates
    let ranX,
      ranY,
      ranZ = Math.random() * (8 - size_factor) + (-6 + size_factor);
    do {
      ranX = Math.random() * (xMax - xMin) + xMin;
      ranY = Math.random() * (yMax - yMin) + yMin;
    } while (this.target_collision(ranX, ranY));
    return vec4(ranX, ranY, ranZ, strafe_speed);
  }

  generate_target_locations() {
    this.target_locations = new Set();
    for (let i = 0; i < this.target_num; i++) {
      this.target_locations.add(this.generate_location());
    }
  }

  model_target(context, program_state, coord, r, t) {
    let up_down = 0.03 * Math.sin(6 * t);

    let target_loc_transform = Mat4.translation(
      coord[0] + this.move_factor * Math.sin(coord[3] * t),
      coord[1] + up_down,
      coord[2]
    ).times(Mat4.scale(r, r, r));

    let target_circ_transform = target_loc_transform.times(
      Mat4.scale(1, 1, 0.05)
    );
    this.shapes.target_circle.draw(
      context,
      program_state,
      target_circ_transform,
      this.materials.gray
    );

    let target_circ_2_transform = target_loc_transform
      .times(Mat4.translation(0, 0, 0.01))
      .times(Mat4.scale(2 / 3, 2 / 3, 0.05));
    this.shapes.target_circle.draw(
      context,
      program_state,
      target_circ_2_transform,
      this.materials.dark_gray
    );

    let target_circ_3_transform = target_loc_transform
      .times(Mat4.translation(0, 0, 0.02))
      .times(Mat4.scale(1 / 4, 1 / 4, 0.05));
    this.shapes.target_circle.draw(
      context,
      program_state,
      target_circ_3_transform,
      this.materials.gray
    );

    let target_base_transform = target_loc_transform
      .times(Mat4.translation(0, 0, -0.03))
      .times(Mat4.scale(0.95, 1.05, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      target_base_transform,
      this.materials.dark_gray
    );

    let target_base_2_transform = target_loc_transform
      .times(Mat4.translation(0, 1 - 1 / 5, -0.03))
      .times(Mat4.scale(1, 1 / 4, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      target_base_2_transform,
      this.materials.dark_gray
    );

    let target_base_3_transform = target_loc_transform
      .times(Mat4.translation(0, -1 + 1 / 5, -0.03))
      .times(Mat4.scale(1, 1 / 4, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      target_base_3_transform,
      this.materials.dark_gray
    );

    let target_hinge_transform = target_loc_transform
      .times(Mat4.translation(0, 1, 0.04))
      .times(Mat4.scale(0.1, 0.06, 0.04));
    this.shapes.cube.draw(
      context,
      program_state,
      target_hinge_transform,
      this.materials.dark_gray
    );

    let target_hinge_2_transform = target_loc_transform
      .times(Mat4.translation(0, -1, 0.04))
      .times(Mat4.scale(0.1, 0.06, 0.04));
    this.shapes.cube.draw(
      context,
      program_state,
      target_hinge_2_transform,
      this.materials.dark_gray
    );

    let target_back_hinge_transform = target_loc_transform
      .times(Mat4.translation(0, 0, -0.125))
      .times(Mat4.scale(0.6, 1.12, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      target_back_hinge_transform,
      this.materials.dark_gray
    );

    let target_back_hinge_2_transform = target_loc_transform
      .times(Mat4.translation(0.125, 0, -0.1))
      .times(Mat4.scale(0.02, 1.18, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      target_back_hinge_2_transform,
      this.materials.dark_gray
    );

    let target_back_hinge_3_transform = target_loc_transform
      .times(Mat4.translation(-0.125, 0, -0.1))
      .times(Mat4.scale(0.02, 1.18, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      target_back_hinge_3_transform,
      this.materials.dark_gray
    );

    let target_back_hinge_4_transform = target_loc_transform
      .times(Mat4.translation(0, -1.19, -0.1))
      .times(Mat4.scale(0.15, 0.015, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      target_back_hinge_4_transform,
      this.materials.dark_gray
    );

    let target_bot_hinge_transform = target_loc_transform
      .times(Mat4.translation(0, 1.19, -0.1))
      .times(Mat4.scale(0.15, 0.015, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      target_bot_hinge_transform,
      this.materials.dark_gray
    );

    let target_bot_hinge_2_transform = target_loc_transform
      .times(Mat4.translation(0, 1.33, -0.1))
      .times(Mat4.scale(0.08, 0.15, 0.08));
    this.shapes.cube.draw(
      context,
      program_state,
      target_bot_hinge_2_transform,
      this.materials.dark_gray
    );

    let target_bot_base_transform = target_loc_transform
      .times(Mat4.translation(0, 1.65, -0.1))
      .times(Mat4.scale(0.15, 0.35, 0.2));
    this.shapes.cube.draw(
      context,
      program_state,
      target_bot_base_transform,
      this.materials.gray
    );

    let target_bot_base_2_transform = target_loc_transform
      .times(Mat4.translation(0, 2, -0.1))
      .times(Mat4.scale(0.5, 0.1, 0.2));
    this.shapes.cube.draw(
      context,
      program_state,
      target_bot_base_2_transform,
      this.materials.gray
    );

    this.shapes.cube.draw(
      context,
      program_state,
      target_bot_base_2_transform
        .times(Mat4.translation(0, 1, 0))
        .times(Mat4.scale(1.01, 0.25, 1.2)),
      this.materials.dark_gray
    );

    let target_eye_transform = target_loc_transform
      .times(Mat4.translation(0, 1.88, 0.11))
      .times(Mat4.scale(1.1, 0.7, 1))
      .times(Mat4.rotation(Math.PI / 4, 0, 0, 1))
      .times(Mat4.scale(0.3, 0.3, 1));
    this.shapes.triangle.draw(
      context,
      program_state,
      target_eye_transform,
      this.materials.spike_aura
    );

    let target_tri_transform = target_loc_transform
      .times(Mat4.translation(0.152, 2, -0.3))
      .times(Mat4.scale(0.35, 0.5, 1))
      .times(Mat4.scale(1, -1, 1));
    this.shapes.bot_tri.draw(
      context,
      program_state,
      target_tri_transform,
      this.materials.untextured_gray
    );

    let target_tri_2_transform = target_loc_transform
      .times(Mat4.translation(-0.15, 2, -0.3))
      .times(Mat4.scale(0.35, 0.5, 1))
      .times(Mat4.scale(-1, -1, 1));
    this.shapes.bot_tri.draw(
      context,
      program_state,
      target_tri_2_transform,
      this.materials.untextured_gray
    );

    let target_outline_transform = target_loc_transform
      .times(Mat4.translation(0.5, 2, -0.1))
      .times(Mat4.scale(0.025, 0.125, 0.24));
    this.shapes.cube.draw(
      context,
      program_state,
      target_outline_transform,
      this.materials.dark_gray
    );

    let target_outline_2_transform = target_loc_transform
      .times(Mat4.translation(-0.5, 2, -0.1))
      .times(Mat4.scale(0.025, 0.125, 0.24));
    this.shapes.cube.draw(
      context,
      program_state,
      target_outline_2_transform,
      this.materials.dark_gray
    );

    let target_outline_3_transform = target_loc_transform
      .times(Mat4.translation(0.16, 1.6, -0.1))
      .times(Mat4.scale(0.025, 0.275, 0.24));
    this.shapes.cube.draw(
      context,
      program_state,
      target_outline_3_transform,
      this.materials.dark_gray
    );

    let target_outline_4_transform = target_loc_transform
      .times(Mat4.translation(-0.16, 1.6, -0.1))
      .times(Mat4.scale(0.025, 0.275, 0.24));
    this.shapes.cube.draw(
      context,
      program_state,
      target_outline_4_transform,
      this.materials.dark_gray
    );

    let target_outline_5_transform = target_loc_transform
      .times(Mat4.translation(-0.325, 1.9, -0.1))
      .times(Mat4.scale(0.19, 0.025, 0.24));
    this.shapes.cube.draw(
      context,
      program_state,
      target_outline_5_transform,
      this.materials.dark_gray
    );

    let target_outline_6_transform = target_loc_transform
      .times(Mat4.translation(0.325, 1.9, -0.1))
      .times(Mat4.scale(0.19, 0.025, 0.24));
    this.shapes.cube.draw(
      context,
      program_state,
      target_outline_6_transform,
      this.materials.dark_gray
    );

    let target_outline_7_transform = target_loc_transform
      .times(Mat4.translation(0, 1.3, -0.1))
      .times(Mat4.scale(0.185, 0.025, 0.24));
    this.shapes.cube.draw(
      context,
      program_state,
      target_outline_7_transform,
      this.materials.dark_gray
    );

    let target_bot_yellow_transform = target_loc_transform
      .times(Mat4.translation(0, 1.8, -0.14))
      .times(Mat4.scale(0.46, 0.09, 0.1));
    this.shapes.cube.draw(
      context,
      program_state,
      target_bot_yellow_transform,
      this.materials.gray.override({ color: hex_color("#91826a") })
    );

    // Additional aesthetics
    let target_circles_transform = target_loc_transform
      .times(Mat4.translation(0, 1.8, 0.12))
      .times(Mat4.scale(0.02, 0.02, 1));
    this.shapes.disk.draw(
      context,
      program_state,
      target_circles_transform,
      this.materials.dark_gray
    );

    let target_circles_2_transform = target_loc_transform
      .times(Mat4.translation(-0.04, 1.8 - 0.05, 0.12))
      .times(Mat4.scale(0.02, 0.02, 1));
    this.shapes.disk.draw(
      context,
      program_state,
      target_circles_2_transform,
      this.materials.dark_gray
    );

    let target_circles_3_transform = target_loc_transform
      .times(Mat4.translation(0.04, 1.8 - 0.05, 0.12))
      .times(Mat4.scale(0.02, 0.02, 1));
    this.shapes.disk.draw(
      context,
      program_state,
      target_circles_3_transform,
      this.materials.dark_gray
    );

    // WINDMILL
    let wind_mill_spin = 50 * t;

    let wind_mill_center_transform = target_loc_transform
      .times(Mat4.translation(0, 2.3, -0.1))
      .times(Mat4.rotation(wind_mill_spin, 0, 1, 0))
      .times(Mat4.rotation(-Math.PI / 2, 1, 0, 0))
      .times(Mat4.scale(1.5, 1.5, 1));
    this.shapes.capped_cylinder.draw(
      context,
      program_state,
      wind_mill_center_transform.times(Mat4.scale(0.05, 0.05, 0.08)),
      this.materials.dark_gray
    );

    this.shapes.capped_cylinder.draw(
      context,
      program_state,
      wind_mill_center_transform
        .times(Mat4.translation(0, 0, -0.1))
        .times(Mat4.scale(0.025, 0.025, 0.3)),
      this.materials.gray
    );

    let wind_mill_wing_transform = wind_mill_center_transform
      .times(Mat4.translation(0, 0, 0))
      .times(Mat4.scale(0.06, 0.6, 0.01));
    this.shapes.cube.draw(
      context,
      program_state,
      wind_mill_wing_transform,
      this.materials.gray
    );

    let wind_mill_wing_2_transform = wind_mill_center_transform
      .times(Mat4.translation(0, 0, 0))
      .times(Mat4.rotation(Math.PI / 2, 0, 0, 1))
      .times(Mat4.scale(0.06, 0.6, 0.01));
    this.shapes.cube.draw(
      context,
      program_state,
      wind_mill_wing_2_transform,
      this.materials.gray
    );

    let wind_mill_wing_armor_transform = wind_mill_wing_transform
      .times(Mat4.translation(0, 0, 0))
      .times(Mat4.scale(0.4, 0.6, 2));
    this.shapes.cube.draw(
      context,
      program_state,
      wind_mill_wing_armor_transform,
      this.materials.dark_gray
    );

    let wind_mill_wing_armor_transform_2 = wind_mill_wing_transform
      .times(Mat4.translation(0, 0, 0))
      .times(Mat4.scale(0.2, 0.4, 3));
    this.shapes.cube.draw(
      context,
      program_state,
      wind_mill_wing_armor_transform_2,
      this.materials.gray
    );

    let wind_mill_wing_armor_2_transform = wind_mill_wing_2_transform
      .times(Mat4.translation(0, 0, 0))
      .times(Mat4.scale(0.4, 0.6, 2));
    this.shapes.cube.draw(
      context,
      program_state,
      wind_mill_wing_armor_2_transform,
      this.materials.dark_gray
    );

    let wind_mill_wing_armor_2_transform_2 = wind_mill_wing_2_transform
      .times(Mat4.translation(0, 0, 0))
      .times(Mat4.scale(0.2, 0.4, 3));
    this.shapes.cube.draw(
      context,
      program_state,
      wind_mill_wing_armor_2_transform_2,
      this.materials.gray
    );
  }

  draw_targets(context, program_state, t) {
    let model_transform = Mat4.identity();
    let r = this.target_r;
    for (let coord of this.target_locations) {
      this.model_target(context, program_state, coord, r, t);
    }
  }

  // Determine if a target was hit
  hit_target(coord, pos_world, t, r) {
    let t_x = coord[0] + this.move_factor * Math.sin(coord[3] * t),
      t_y = coord[1]; // Target coodinates
    let h_x = pos_world[0],
      h_y = pos_world[1]; // Mouse click coordinates
    let d = Math.sqrt((t_x - h_x) ** 2 + (t_y - h_y) ** 2);
    // console.log(t_x);
    if (d <= r) {
      // If the mouse click is within radius length of target
      if (d <= r / 4) {
        this.points += 2000;
      }
      return true;
    }
    return false;
  }

  // Mouse Picking
  my_mouse_down(e, pos, context, program_state) {
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

    // if (this.iter <= this.frames_offset) {
    //   return;
    // }

    if (gameStarted == false) {
      return;
    }

    if (this.game_end) {
      return;
    }

    const t = program_state.animation_time / 1000;

    let missed = true;

    let pos_ndc_near = vec4(pos[0], pos[1], -1.0, 1.0);
    let pos_ndc_far = vec4(pos[0], pos[1], 1.0, 1.0);
    let center_ndc_near = vec4(0.0, 0.0, -1.0, 1.0);
    let P = program_state.projection_transform;
    let V = program_state.camera_inverse;
    let pos_world_near = Mat4.inverse(P.times(V)).times(pos_ndc_near);
    let pos_world_far = Mat4.inverse(P.times(V)).times(pos_ndc_far);
    let center_world_near = Mat4.inverse(P.times(V)).times(center_ndc_near);
    pos_world_near.scale_by(1 / pos_world_near[3]);
    pos_world_far.scale_by(1 / pos_world_far[3]);
    center_world_near.scale_by(1 / center_world_near[3]);

    // gun_with_ammo.play();
    // quite_shot.play();
    // laser.play();
    // Two of the same sounds to allow overlap
    // if (this.total_shots % 3 == 0) {
    //   audioFiles["gunSound1"].play();
    //   console.log("one");
    // } else if (this.total_shots % 3 == 1) {
    //   audioFiles["gunSound2"].play();
    //   console.log("two");
    // }
    // else {
    //   audioFiles["gunSound3"].play();
    //   console.log("three");
    // }
    audioFiles["gunSound1"].currentTime = 0;
    audioFiles["gunSound1"].play();

    this.total_shots++;
    for (const coord of this.target_locations) {
      // Interpolation for near and far to get to the t of the z-coordinate of the target
      let z = coord[2], z1 = pos_world_near[2], z2 = pos_world_far[2];
      let t_2 = (z - z1) / (z2 - z1);
      let x = (1 - t_2) * pos_world_near[0] + t_2 * pos_world_far[0];
      let y = (1 - t_2) * pos_world_near[1] + t_2 * pos_world_far[1];
      let world_coord = vec4(x, y, z, 1.0);
      console.log(world_coord); // each target has its own coordinates
      if (this.hit_target(coord, world_coord, t, this.target_r)) {
        missed = false;
        this.cont_hits++;
        this.cont_hits_2++;
        this.cont_misses = 0;
        // console.log(this.cont_hits);
        // Valorant kill sounds with different sound for more hits
        switch (this.cont_hits_2) {
          case 1:
            if (this.hits % 2 == 1) {
              audioFiles["killSound1"].play();
            } else {
              audioFiles["killSound1.1"].play();
            }
            // this.first_hit.play();
            // console.log("first");
            break;
          case 2:
            audioFiles["killSound2"].play();
            // this.second_hit.play();
            // console.log("second");
            break;
          case 3:
            audioFiles["killSound3"].play();
            // this.third_hit.play();
            // console.log("third");
            this.cont_hits_2 = 0;
            break;
          // default:
          //   audioFiles["killSound4"].play();
          //   // this.fifth_hit.play();
          //   // console.log("fourth");
          //   this.cont_hits_2 = 0;
          //   break;
        }
        switch (
          this.cont_hits // for points
        ) {
          case 1:
            break;
          case 2:
            this.points += 200;
            break;
          case 3:
            this.points += 500;
            break;
          case 4:
            this.points += 1000;
            break;
          default:
            this.points += 1800;
            break;
        }

        this.points += 1000;
        this.hits++;
        this.target_locations.delete(coord);
        this.target_locations.add(this.generate_location());
        break;
      }
    }
    if (missed) {
      if (this.points >= 500) {
        // cannot get negative points
        this.points -= 500;
      }
      this.cont_hits = 0;
      this.cont_hits_2 = 0;
      this.cont_misses++;
      // easter egg :)
      if (this.cont_misses == 4) {
        audioFiles["terrible"].play();
      }

      // bullet tracers
      let z = -17.5, z1 = pos_world_near[2], z2 = pos_world_far[2];
      let t_2 = (z - z1) / (z2 - z1);
      let x = (1 - t_2) * pos_world_near[0] + t_2 * pos_world_far[0];
      let y = (1 - t_2) * pos_world_near[1] + t_2 * pos_world_far[1];
      let world_coord = vec4(x, y, z, 1.0);
      this.bullet_tracer_queue.push([world_coord, 3*60]);
    }
    this.accuracy = this.hits / this.total_shots;
    this.accuracy = Math.round(this.accuracy * 10000) / 100;
    if (this.accuracy != 100) {
      this.accuracy = this.accuracy.toFixed(2);
    }
    this.shot = true;


    // check if plank is shot

    if (!this.plank_init){
      // plank coordinates 
      // (-2,2.8,-15.9)
      // should modularize the interpolation function 
      let z = -15.9, z1 = pos_world_near[2], z2 = pos_world_far[2];
      let t_2 = (z - z1) / (z2 - z1);
      let x = (1 - t_2) * pos_world_near[0] + t_2 * pos_world_far[0];
      let y = (1 - t_2) * pos_world_near[1] + t_2 * pos_world_far[1];
      let world_coord = vec4(x, y, z, 1.0);
      if (this.hit_target(vec4(-2,2.8,0,0), world_coord, t, 0.2)){
        this.plank_shot = true;
        this.plank_t_diff = t;
        this.plank_init = true;
      }
    }


  }

  draw_guns_ground(context, program_state) {
    let gun_move_transform = Mat4.identity()
      .times(Mat4.translation(-15, -2.2, 0))
      .times(Mat4.rotation(Math.PI / 30, 0, 0, 1))
      .times(Mat4.rotation(-Math.PI / 2, 0, 0, 1))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
      .times(Mat4.rotation(0, 0, 0, 1))
      .times(Mat4.scale(0.26, 0.26, 0.26));

    let gun_base_transform = gun_move_transform
      .times(Mat4.translation(0.2, 0, 0))
      .times(Mat4.scale(3.5, 0.75, 0.4));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_base_transform,
      this.materials.gun
    );

    let gun_base_top_transform = gun_move_transform
      .times(Mat4.translation(3, 0.1, 0))
      .times(Mat4.rotation(-0.15, 0, 0, 1))
      .times(Mat4.scale(2, 0.6, 0.4))
      .times(Mat4.rotation(0.5, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_base_top_transform,
      this.materials.gun
    );

    let gun_base_front_transform = gun_move_transform
      .times(Mat4.translation(-2.3, 0.45, 0))
      .times(Mat4.rotation(0.01, 0, 0, 1))
      .times(Mat4.scale(2, 0.3, 0.4))
      .times(Mat4.rotation(-0.08, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_base_front_transform,
      this.materials.gun
    );

    let gun_clip_transform = gun_move_transform
      .times(Mat4.translation(0.65, -1.6, 0))
      .times(Mat4.scale(0.8, 2, 0.2))
      .times(Mat4.rotation(0.035, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_clip_transform,
      this.materials.gun
    );

    let gun_handle_transform = gun_move_transform
      .times(Mat4.translation(3.83, -1.7, 0))
      .times(Mat4.rotation(0.3, 0, 0, 1))
      .times(Mat4.scale(0.52, 1.3, 0.2))
      .times(Mat4.rotation(0.08, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_handle_transform,
      this.materials.gun
    );

    let gun_stock_transform = gun_move_transform
      .times(Mat4.translation(6, -0.5, 0))
      .times(Mat4.scale(2, 0.55, 0.4));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_stock_transform,
      this.materials.gun
    );

    let gun_stock_2_transform = gun_move_transform
      .times(Mat4.translation(6.78, -0.85, 0))
      .times(Mat4.rotation(0.3, 0, 0, 1))
      .times(Mat4.scale(1.1, 0.6, 0.4));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_stock_2_transform,
      this.materials.gun
    );
    let gun_stock_3_transform = gun_move_transform
      .times(Mat4.translation(6.96, -1.34, 0))
      .times(Mat4.rotation(-0.1, 0, 0, 1))
      .times(Mat4.scale(0.97, 0.5, 0.3));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_stock_3_transform,
      this.materials.gun
    );

    let gun_barrel_tranform = gun_move_transform
      .times(Mat4.translation(-6.5, 0, 0))
      .times(Mat4.scale(6, 0.45, 0.38))
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0));
    this.shapes.cylinder.draw(
      context,
      program_state,
      gun_barrel_tranform,
      this.materials.gun
    );

    gun_barrel_tranform = gun_barrel_tranform
      .times(Mat4.translation(0, 0, 0.18))
      .times(Mat4.scale(1.08, 1.08, 0.04));
    this.shapes.cylinder.draw(
      context,
      program_state,
      gun_barrel_tranform,
      this.materials.gun3
    );

    gun_barrel_tranform = gun_barrel_tranform.times(Mat4.translation(0, 0, 2));
    this.shapes.cylinder.draw(
      context,
      program_state,
      gun_barrel_tranform,
      this.materials.gun3
    );

    let gun_barrel_front_transform = gun_move_transform
      .times(Mat4.translation(-2, -0.24, 0))
      .times(Mat4.rotation(-0.05, 0, 0, 1))
      .times(Mat4.scale(2, 0.5, 0.4))
      .times(Mat4.rotation(0.2, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_barrel_front_transform,
      this.materials.gun
    );

    let gun_barrel_wedge_transform = gun_move_transform
      .times(Mat4.translation(-3.415, -0.6, 0))
      .times(Mat4.scale(0.15, 0.25, 0.4))
      .times(Mat4.rotation(-0.4, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_barrel_wedge_transform,
      this.materials.gun
    );

    let gun_aim_transform = gun_move_transform
      .times(Mat4.translation(-3.6, 0.68, 0.15))
      .times(Mat4.scale(0.4, 0.2, 0.025))
      .times(Mat4.rotation(0.4, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_aim_transform,
      this.materials.gun
    );

    let gun_aim_2_transform = gun_move_transform
      .times(Mat4.translation(-3.6, 0.68, -0.15))
      .times(Mat4.scale(0.4, 0.2, 0.025))
      .times(Mat4.rotation(0.4, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_aim_2_transform,
      this.materials.gun
    );

    let gun_aim_3_transform = gun_move_transform
      .times(Mat4.translation(-3.5, 0.7, 0))
      .times(Mat4.scale(0.2, 0.15, 0.02))
      .times(Mat4.rotation(0.4, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_aim_3_transform,
      this.materials.gun2
    );

    let gun_aim_base_transform = gun_move_transform
      .times(Mat4.translation(-3.6, 0.68, 0))
      .times(Mat4.scale(0.3, 0.125, 0.125));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_aim_base_transform,
      this.materials.gun
    );

    let gun_mag_holder_transform = gun_move_transform
      .times(Mat4.translation(0.63, -0.9, 0))
      .times(Mat4.scale(1, 1.3, 1))
      .times(Mat4.rotation(-0.3, 0, 0, 1))
      .times(Mat4.scale(1, 0.6, 0.4))
      .times(Mat4.rotation(0.2, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_mag_holder_transform,
      this.materials.gun
    );

    let gun_side_1_tansform = gun_move_transform
      .times(Mat4.translation(-1.8, -0.1, 0))
      .times(Mat4.rotation(-0.28, 0, 0, 1))
      .times(Mat4.scale(1.2, 0.6, 1))
      .times(Mat4.rotation(Math.PI / 6, 0, 0, 1))
      .times(Mat4.scale(1.2, 0.6, 0.6))
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_side_1_tansform,
      this.materials.gun
    );

    let gun_side_2_tansform = gun_move_transform
      .times(Mat4.translation(1, -0.1, 0))
      .times(Mat4.rotation(-0.065, 0, 0, 1))
      .times(Mat4.scale(3, 0.3, 0.9))
      .times(Mat4.rotation(1, 0, 0, 1))
      .times(Mat4.scale(1.2, 0.6, 0.6))
      .times(Mat4.rotation(-0.7, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_side_2_tansform,
      this.materials.gun
    );

    let gun_top_transform = gun_move_transform
      .times(Mat4.translation(0.6, 0.8, 0))
      .times(Mat4.scale(0.8, 0.09, 0.5));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_top_transform,
      this.materials.gun
    );

    let gun_top_tri_1_transform = gun_move_transform
      .times(Mat4.translation(1.3, 1.1, 0))
      .times(Mat4.scale(1, 0.3, 0.6))
      .times(Mat4.rotation(Math.PI, 0, 0, 1))
      .times(Mat4.rotation(Math.PI / 4, 1, 0, 0))
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0));
    this.shapes.triangle.draw(
      context,
      program_state,
      gun_top_tri_1_transform,
      this.materials.gun
    );

    let gun_top_tri_2_transform = gun_move_transform
      .times(Mat4.translation(1.31, 1.1, 0))
      .times(Mat4.scale(1, 0.1, 0.1))
      .times(Mat4.rotation(Math.PI, 0, 0, 1))
      .times(Mat4.rotation(Math.PI / 4, 1, 0, 0))
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0));
    this.shapes.triangle.draw(
      context,
      program_state,
      gun_top_tri_2_transform,
      this.materials.gun2
    );

    let gun_scope_base_transform = gun_move_transform
      .times(Mat4.translation(3.1, 0.8, 0))
      .times(Mat4.scale(0.4, 0.09, 0.3));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_scope_base_transform,
      this.materials.gun
    );

    let gun_scope_base_2_transform = gun_move_transform
      .times(Mat4.translation(3.2, 0.9, 0))
      .times(Mat4.scale(0.2, 0.025, 0.2));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_scope_base_2_transform,
      this.materials.gun
    );

    let gun_scope_base_3_transform = gun_move_transform
      .times(Mat4.translation(3.2, 0.93, 0))
      .times(Mat4.scale(0.08, 0.025, 0.0225));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_scope_base_3_transform,
      this.materials.gun2
    );

    let gun_scope_side_1_transform = gun_move_transform
      .times(Mat4.translation(3.1, 0.8, 0.2))
      .times(Mat4.scale(0.32, 0.3, 0.026));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_scope_side_1_transform,
      this.materials.gun
    );

    let gun_scope_side_2_transform = gun_move_transform
      .times(Mat4.translation(3.1, 0.8, -0.2))
      .times(Mat4.scale(0.32, 0.3, 0.026));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_scope_side_2_transform,
      this.materials.gun
    );

    let gun_scope_dot_transform = gun_move_transform
      .times(Mat4.translation(3.2, 1.0, 0))
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
      .times(Mat4.scale(0.08, 0.08, 0.15));
    this.shapes.scope.draw(
      context,
      program_state,
      gun_scope_dot_transform,
      this.materials.gun
    );

    let gun_side_thing_transform = gun_move_transform
      .times(Mat4.translation(1.6, -0.7, 0))
      .times(Mat4.scale(0.025, 0.1, 0.5));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_side_thing_transform,
      this.materials.gun2
    );

    gun_side_thing_transform = gun_side_thing_transform.times(
      Mat4.scale(0.98, 2, 0.98)
    );
    this.shapes.cube.draw(
      context,
      program_state,
      gun_side_thing_transform,
      this.materials.gun
    );

    let gun_side_thing_2_transform = gun_move_transform
      .times(Mat4.translation(1.76, -0.525, 0))
      .times(Mat4.scale(0.2, 0.03, 0.5));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_side_thing_2_transform,
      this.materials.gun
    );

    gun_side_thing_2_transform = gun_side_thing_2_transform.times(
      Mat4.translation(0, -14, 0)
    );
    this.shapes.cube.draw(
      context,
      program_state,
      gun_side_thing_2_transform,
      this.materials.gun
    );

    let gun_circle_transform = gun_move_transform
      .times(Mat4.translation(2.8, -0.65, 0))
      .times(Mat4.scale(0.125, 0.125, 0.9));
    this.shapes.capped_cylinder.draw(
      context,
      program_state,
      gun_circle_transform,
      this.materials.gun
    );

    let gun_circle_2_transform = gun_move_transform
      .times(Mat4.translation(2.7, -0.56, 0))
      .times(Mat4.scale(0.1, 0.03, 0.45));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_circle_2_transform,
      this.materials.gun
    );

    let gun_trigger_base_transform = gun_move_transform
      .times(Mat4.translation(2.2, -0.7, 0))
      .times(Mat4.scale(0.9, 0.4, 0.4));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_trigger_base_transform,
      this.materials.gun
    );

    let gun_trigger_safety_transform = gun_move_transform
      .times(Mat4.translation(1.7, -1.8, 0))
      .times(Mat4.rotation(-Math.PI / 16, 0, 0, 1))
      .times(Mat4.scale(0.9, 0.03, 0.2));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_trigger_safety_transform,
      this.materials.gun
    );

    gun_trigger_safety_transform = gun_move_transform
      .times(Mat4.translation(3.4, -1.5, 0))
      .times(Mat4.rotation(Math.PI / 6, 0, 0, 1))
      .times(Mat4.scale(0.98, 0.03, 0.2));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_trigger_safety_transform,
      this.materials.gun
    );

    let gun_trigger_transform = gun_move_transform
      .times(Mat4.translation(2.6, -1.25, 0))
      .times(Mat4.rotation(0.3, 0, 0, 1))
      .times(Mat4.scale(0.05, 0.3, 0.1))
      .times(Mat4.rotation(0.2, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_trigger_transform,
      this.materials.gun
    );

    let pistol = Mat4.identity()
      .times(Mat4.translation(-11, -4.5, 3))
      .times(Mat4.rotation(-Math.PI / 2.5, 0, 1, 0))
      .times(Mat4.scale(0.3, 0.3, 0.3));
    this.shapes.pistol.draw(
      context,
      program_state,
      pistol,
      this.materials.pistol
    );
    let pistol2 = Mat4.identity()
      .times(Mat4.translation(-9, -4.5, 3))
      .times(Mat4.rotation(Math.PI / 3, 0, 1, 0))
      .times(Mat4.scale(0.3, 0.3, 0.3));
    this.shapes.pistol.draw(
      context,
      program_state,
      pistol2,
      this.materials.pistol
    );
  }

  // Gun model
  draw_gun(context, program_state, t, shot) {
    // connect mouse clicking to recoil if possible

    let recoil = 0;
    if (shot) {
      this.recoil_counter++;
      recoil = 0.1 * Math.sin(5 * Math.PI * t);
      if (this.recoil_counter == 18) {
        this.shot = false;
        this.recoil_counter = 0;
      }
    }

    let gun_move_transform = Mat4.translation(2, -1, 15.7 + recoil)
      .times(Mat4.rotation(recoil / 10 - (44 * Math.PI) / 90, 0, 1, 0))
      .times(Mat4.rotation(recoil / 10 - (1 * Math.PI) / 40, 0, 0, 1))
      .times(Mat4.scale(0.3, 0.3, 0.3));

    let gun_base_transform = gun_move_transform
      .times(Mat4.translation(0.2, 0, 0))
      .times(Mat4.scale(3.5, 0.75, 0.4));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_base_transform,
      this.materials.gun
    );

    let gun_base_top_transform = gun_move_transform
      .times(Mat4.translation(3, 0.1, 0))
      .times(Mat4.rotation(-0.15, 0, 0, 1))
      .times(Mat4.scale(2, 0.6, 0.4))
      .times(Mat4.rotation(0.5, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_base_top_transform,
      this.materials.gun
    );

    let gun_base_front_transform = gun_move_transform
      .times(Mat4.translation(-2.3, 0.45, 0))
      .times(Mat4.rotation(0.01, 0, 0, 1))
      .times(Mat4.scale(2, 0.3, 0.4))
      .times(Mat4.rotation(-0.08, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_base_front_transform,
      this.materials.gun
    );

    let gun_clip_transform = gun_move_transform
      .times(Mat4.translation(0.65, -1.6, 0))
      .times(Mat4.scale(0.8, 2, 0.2))
      .times(Mat4.rotation(0.035, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_clip_transform,
      this.materials.gun
    );

    let gun_handle_transform = gun_move_transform
      .times(Mat4.translation(3.83, -1.7, 0))
      .times(Mat4.rotation(0.3, 0, 0, 1))
      .times(Mat4.scale(0.52, 1.3, 0.2))
      .times(Mat4.rotation(0.08, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_handle_transform,
      this.materials.gun
    );

    let gun_stock_transform = gun_move_transform
      .times(Mat4.translation(6, -0.5, 0))
      .times(Mat4.scale(2, 0.55, 0.4));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_stock_transform,
      this.materials.gun
    );

    let gun_stock_2_transform = gun_move_transform
      .times(Mat4.translation(6.78, -0.85, 0))
      .times(Mat4.rotation(0.3, 0, 0, 1))
      .times(Mat4.scale(1.1, 0.6, 0.4));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_stock_2_transform,
      this.materials.gun
    );
    let gun_stock_3_transform = gun_move_transform
      .times(Mat4.translation(6.96, -1.34, 0))
      .times(Mat4.rotation(-0.1, 0, 0, 1))
      .times(Mat4.scale(0.97, 0.5, 0.3));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_stock_3_transform,
      this.materials.gun
    );

    let gun_barrel_tranform = gun_move_transform
      .times(Mat4.translation(-6.5, 0, 0))
      .times(Mat4.scale(6, 0.45, 0.38))
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0));
    this.shapes.cylinder.draw(
      context,
      program_state,
      gun_barrel_tranform,
      this.materials.gun
    );

    gun_barrel_tranform = gun_barrel_tranform
      .times(Mat4.translation(0, 0, 0.18))
      .times(Mat4.scale(1.08, 1.08, 0.04));
    this.shapes.cylinder.draw(
      context,
      program_state,
      gun_barrel_tranform,
      this.materials.gun3
    );

    gun_barrel_tranform = gun_barrel_tranform.times(Mat4.translation(0, 0, 2));
    this.shapes.cylinder.draw(
      context,
      program_state,
      gun_barrel_tranform,
      this.materials.gun3
    );

    let gun_barrel_front_transform = gun_move_transform
      .times(Mat4.translation(-2, -0.24, 0))
      .times(Mat4.rotation(-0.05, 0, 0, 1))
      .times(Mat4.scale(2, 0.5, 0.4))
      .times(Mat4.rotation(0.2, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_barrel_front_transform,
      this.materials.gun
    );

    let gun_barrel_wedge_transform = gun_move_transform
      .times(Mat4.translation(-3.415, -0.6, 0))
      .times(Mat4.scale(0.15, 0.25, 0.4))
      .times(Mat4.rotation(-0.4, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_barrel_wedge_transform,
      this.materials.gun
    );

    let gun_aim_transform = gun_move_transform
      .times(Mat4.translation(-3.6, 0.68, 0.15))
      .times(Mat4.scale(0.4, 0.2, 0.025))
      .times(Mat4.rotation(0.4, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_aim_transform,
      this.materials.gun
    );

    let gun_aim_2_transform = gun_move_transform
      .times(Mat4.translation(-3.6, 0.68, -0.15))
      .times(Mat4.scale(0.4, 0.2, 0.025))
      .times(Mat4.rotation(0.4, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_aim_2_transform,
      this.materials.gun
    );

    let gun_aim_3_transform = gun_move_transform
      .times(Mat4.translation(-3.5, 0.7, 0))
      .times(Mat4.scale(0.2, 0.15, 0.02))
      .times(Mat4.rotation(0.4, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_aim_3_transform,
      this.materials.gun2
    );

    let gun_aim_base_transform = gun_move_transform
      .times(Mat4.translation(-3.6, 0.68, 0))
      .times(Mat4.scale(0.3, 0.125, 0.125));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_aim_base_transform,
      this.materials.gun
    );

    let gun_mag_holder_transform = gun_move_transform
      .times(Mat4.translation(0.63, -0.9, 0))
      .times(Mat4.scale(1, 1.3, 1))
      .times(Mat4.rotation(-0.3, 0, 0, 1))
      .times(Mat4.scale(1, 0.6, 0.4))
      .times(Mat4.rotation(0.2, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_mag_holder_transform,
      this.materials.gun
    );

    let gun_side_1_tansform = gun_move_transform
      .times(Mat4.translation(-1.8, -0.1, 0))
      .times(Mat4.rotation(-0.28, 0, 0, 1))
      .times(Mat4.scale(1.2, 0.6, 1))
      .times(Mat4.rotation(Math.PI / 6, 0, 0, 1))
      .times(Mat4.scale(1.2, 0.6, 0.6))
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_side_1_tansform,
      this.materials.gun
    );

    let gun_side_2_tansform = gun_move_transform
      .times(Mat4.translation(1, -0.1, 0))
      .times(Mat4.rotation(-0.065, 0, 0, 1))
      .times(Mat4.scale(3, 0.3, 0.9))
      .times(Mat4.rotation(1, 0, 0, 1))
      .times(Mat4.scale(1.2, 0.6, 0.6))
      .times(Mat4.rotation(-0.7, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_side_2_tansform,
      this.materials.gun
    );

    let gun_top_transform = gun_move_transform
      .times(Mat4.translation(0.6, 0.8, 0))
      .times(Mat4.scale(0.8, 0.09, 0.5));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_top_transform,
      this.materials.gun
    );

    let gun_top_tri_1_transform = gun_move_transform
      .times(Mat4.translation(1.3, 1.1, 0))
      .times(Mat4.scale(1, 0.3, 0.6))
      .times(Mat4.rotation(Math.PI, 0, 0, 1))
      .times(Mat4.rotation(Math.PI / 4, 1, 0, 0))
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0));
    this.shapes.triangle.draw(
      context,
      program_state,
      gun_top_tri_1_transform,
      this.materials.gun
    );

    let gun_top_tri_2_transform = gun_move_transform
      .times(Mat4.translation(1.31, 1.1, 0))
      .times(Mat4.scale(1, 0.1, 0.1))
      .times(Mat4.rotation(Math.PI, 0, 0, 1))
      .times(Mat4.rotation(Math.PI / 4, 1, 0, 0))
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0));
    this.shapes.triangle.draw(
      context,
      program_state,
      gun_top_tri_2_transform,
      this.materials.gun2
    );

    let gun_scope_base_transform = gun_move_transform
      .times(Mat4.translation(3.1, 0.8, 0))
      .times(Mat4.scale(0.4, 0.09, 0.3));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_scope_base_transform,
      this.materials.gun
    );

    let gun_scope_base_2_transform = gun_move_transform
      .times(Mat4.translation(3.2, 0.9, 0))
      .times(Mat4.scale(0.2, 0.025, 0.2));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_scope_base_2_transform,
      this.materials.gun
    );

    let gun_scope_base_3_transform = gun_move_transform
      .times(Mat4.translation(3.2, 0.93, 0))
      .times(Mat4.scale(0.08, 0.025, 0.0225));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_scope_base_3_transform,
      this.materials.gun2
    );

    let gun_scope_side_1_transform = gun_move_transform
      .times(Mat4.translation(3.1, 0.8, 0.2))
      .times(Mat4.scale(0.32, 0.3, 0.026));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_scope_side_1_transform,
      this.materials.gun
    );

    let gun_scope_side_2_transform = gun_move_transform
      .times(Mat4.translation(3.1, 0.8, -0.2))
      .times(Mat4.scale(0.32, 0.3, 0.026));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_scope_side_2_transform,
      this.materials.gun
    );

    let gun_scope_dot_transform = gun_move_transform
      .times(Mat4.translation(3.2, 1.0, 0))
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
      .times(Mat4.scale(0.08, 0.08, 0.15));
    this.shapes.scope.draw(
      context,
      program_state,
      gun_scope_dot_transform,
      this.materials.gun
    );

    let gun_side_thing_transform = gun_move_transform
      .times(Mat4.translation(1.6, -0.7, 0))
      .times(Mat4.scale(0.025, 0.1, 0.5));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_side_thing_transform,
      this.materials.gun2
    );

    gun_side_thing_transform = gun_side_thing_transform.times(
      Mat4.scale(0.98, 2, 0.98)
    );
    this.shapes.cube.draw(
      context,
      program_state,
      gun_side_thing_transform,
      this.materials.gun
    );

    let gun_side_thing_2_transform = gun_move_transform
      .times(Mat4.translation(1.76, -0.525, 0))
      .times(Mat4.scale(0.2, 0.03, 0.5));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_side_thing_2_transform,
      this.materials.gun
    );

    gun_side_thing_2_transform = gun_side_thing_2_transform.times(
      Mat4.translation(0, -14, 0)
    );
    this.shapes.cube.draw(
      context,
      program_state,
      gun_side_thing_2_transform,
      this.materials.gun
    );

    let gun_circle_transform = gun_move_transform
      .times(Mat4.translation(2.8, -0.65, 0))
      .times(Mat4.scale(0.125, 0.125, 0.9));
    this.shapes.capped_cylinder.draw(
      context,
      program_state,
      gun_circle_transform,
      this.materials.gun
    );

    let gun_circle_2_transform = gun_move_transform
      .times(Mat4.translation(2.7, -0.56, 0))
      .times(Mat4.scale(0.1, 0.03, 0.45));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_circle_2_transform,
      this.materials.gun
    );

    let gun_trigger_base_transform = gun_move_transform
      .times(Mat4.translation(2.2, -0.7, 0))
      .times(Mat4.scale(0.9, 0.4, 0.4));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_trigger_base_transform,
      this.materials.gun
    );

    let gun_trigger_safety_transform = gun_move_transform
      .times(Mat4.translation(1.7, -1.8, 0))
      .times(Mat4.rotation(-Math.PI / 16, 0, 0, 1))
      .times(Mat4.scale(0.9, 0.03, 0.2));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_trigger_safety_transform,
      this.materials.gun
    );

    gun_trigger_safety_transform = gun_move_transform
      .times(Mat4.translation(3.4, -1.5, 0))
      .times(Mat4.rotation(Math.PI / 6, 0, 0, 1))
      .times(Mat4.scale(0.98, 0.03, 0.2));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_trigger_safety_transform,
      this.materials.gun
    );

    let gun_trigger_transform = gun_move_transform
      .times(Mat4.translation(2.6, -1.25, 0))
      .times(Mat4.rotation(0.3, 0, 0, 1))
      .times(Mat4.scale(0.05, 0.3, 0.1))
      .times(Mat4.rotation(0.2, 0, 0, 1));
    this.shapes.cube.draw(
      context,
      program_state,
      gun_trigger_transform,
      this.materials.gun
    );

    // duck spray
    let duck_spray_transform = gun_move_transform
      .times(Mat4.translation(4.2,0,0.5))
      .times(Mat4.rotation(Math.PI/24, 0,0,1))
      .times(Mat4.scale(0.45,0.45,1));
    this.shapes.square.draw(
      context, 
      program_state, 
      duck_spray_transform, 
      this.materials.duck_spray.override({ambient: 0.85})
    )
  }
  // Spike model
  draw_spike(context, program_state, t) {
    let spike_loc_transform = Mat4.translation(0, -5, -12).times(
      Mat4.scale(1.5, 1.5, 1.5)
    );

    // spike base midpoint is 1/3
    let spike_base_tri_transform = spike_loc_transform.times(
      Mat4.scale(1, 0.9, 1)
    );

    this.shapes.spike.draw(
      context,
      program_state,
      spike_base_tri_transform,
      this.materials.spike
    );

    let spike_up;

    if (gameStarted == false) {
      spike_up = -0.2;
    } else {
      spike_up =
        0.3 * (t - this.t_diff) < 1.2 ? 0.3 * (t - this.t_diff) - 0.2 : 1;
    }

    let r_spike = 0.2 * Math.sin((Math.PI * (t - this.t_diff)) / 2) + 0.47;
    let g_spike = 1;
    let b_spike = 1;
    let aura_color = color(r_spike, g_spike, b_spike, 0.95);

    // spike parts that need to spin
    // start here ---

    // currently brute forced

    let spike_t;
    if (gameStarted == false || this.iter <= 75) {
      // added some padding so there is no time mismatch that causes NaN
      spike_t = 0;
    } else if (t - this.diff > 120 * 60) {
      spike_t = 0;
    } else {
      spike_t =
        10 *
        ((config["timer"] - this.timer) / config["timer"]) *
        (t - this.t_diff);
    }

    let spike_cylinder_base_transform = spike_loc_transform
      .times(Mat4.translation(0, spike_up, 1 / 3))
      .times(Mat4.scale(0.25, 1.1, 0.25))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0));
    this.shapes.spike_cylinder.draw(
      context,
      program_state,
      spike_cylinder_base_transform,
      this.materials.spike_aura.override({ color: aura_color })
    );

    let spike_pillar_transform = spike_loc_transform
      .times(Mat4.translation(0, spike_up, 1 / 3))
      .times(Mat4.rotation(spike_t, 0, 1, 0))
      .times(Mat4.translation(0, 0, 0.25))
      .times(Mat4.scale(0.07, 0.55, 0.02));
    this.shapes.cube.draw(
      context,
      program_state,
      spike_pillar_transform,
      this.materials.spike
    );

    let spike_pillar_2_transform = spike_loc_transform
      .times(Mat4.translation(0, spike_up, 1 / 3))
      .times(Mat4.rotation(spike_t, 0, 1, 0))
      .times(Mat4.translation(0.2, 0, -0.125))
      .times(Mat4.rotation((2 * Math.PI) / 3, 0, 1, 0))
      .times(Mat4.scale(0.07, 0.55, 0.02));
    this.shapes.cube.draw(
      context,
      program_state,
      spike_pillar_2_transform,
      this.materials.spike
    );

    let spike_pillar_3_transform = spike_loc_transform
      .times(Mat4.translation(0, spike_up, 1 / 3))
      .times(Mat4.rotation(spike_t, 0, 1, 0))
      .times(Mat4.translation(-0.2, 0, -0.125))
      .times(Mat4.rotation((-2 * Math.PI) / 3, 0, 1, 0))
      .times(Mat4.scale(0.07, 0.55, 0.02));
    this.shapes.cube.draw(
      context,
      program_state,
      spike_pillar_3_transform,
      this.materials.spike
    );

    let spike_pillar_ring_transform = spike_loc_transform
      .times(Mat4.translation(0, spike_up, 1 / 3))
      .times(Mat4.scale(0.255, 0.025, 0.255))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0));
    this.shapes.spike_cylinder.draw(
      context,
      program_state,
      spike_pillar_ring_transform,
      this.materials.spike
    );

    let spike_handle_base_transform = spike_loc_transform
      .times(Mat4.translation(0, 0.6 + spike_up, 1 / 3))
      .times(Mat4.scale(0.28, 0.1, 0.28))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0));
    this.shapes.spike_cylinder.draw(
      context,
      program_state,
      spike_handle_base_transform,
      this.materials.spike
    );

    // blinking color
    let blinker;

    if (Math.trunc(spike_t / 4) % 2 == 1) {
      blinker = hex_color("#2f3333");
    } else {
      blinker = color(0.47, 1, 1, 1);
    }
    let spike_handle_base_2_transform = spike_loc_transform
      .times(Mat4.translation(0, 0.67 + spike_up, 1 / 3))
      .times(Mat4.scale(0.26, 0.05, 0.26))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0));
    this.shapes.spike_cylinder.draw(
      context,
      program_state,
      spike_handle_base_2_transform,
      this.materials.spike.override({ color: blinker })
    );

    let spike_handle_base_3_transform = spike_loc_transform
      .times(Mat4.translation(0, 0.72 + spike_up, 1 / 3))
      .times(Mat4.scale(0.26, 0.05, 0.26))
      .times(Mat4.rotation(Math.PI / 2, 1, 0, 0));
    this.shapes.spike_cylinder.draw(
      context,
      program_state,
      spike_handle_base_3_transform,
      this.materials.spike
    );

    let spike_handle_transform = spike_loc_transform
      .times(Mat4.translation(0, 0.82 + spike_up, 1 / 3))
      .times(Mat4.rotation(spike_t, 0, 1, 0))
      .times(Mat4.scale(0.35, 0.04, 0.04))
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0));
    this.shapes.spike_cylinder.draw(
      context,
      program_state,
      spike_handle_transform,
      this.materials.spike
    );

    let spike_handle_side_transform = spike_loc_transform
      .times(Mat4.translation(0, 0.78 + spike_up, 1 / 3))
      .times(Mat4.rotation(spike_t, 0, 1, 0))
      .times(Mat4.translation(0.2, 0, 0))
      .times(Mat4.rotation(Math.PI / 30, 0, 0, 1))
      .times(Mat4.scale(0.025, 0.098, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      spike_handle_side_transform,
      this.materials.spike
    );

    let spike_handle_side_2_transform = spike_loc_transform
      .times(Mat4.translation(0, 0.78 + spike_up, 1 / 3))
      .times(Mat4.rotation(spike_t, 0, 1, 0))
      .times(Mat4.translation(-0.2, 0, 0))
      .times(Mat4.rotation(-Math.PI / 30, 0, 0, 1))
      .times(Mat4.scale(0.025, 0.098, 0.05));
    this.shapes.cube.draw(
      context,
      program_state,
      spike_handle_side_2_transform,
      this.materials.spike
    );

    // end here ----

    let spike_shield_transform = spike_loc_transform
      .times(Mat4.translation(0, 0.2, 1))
      .times(Mat4.scale(0.1, 0.25, 0.03));
    this.shapes.cube.draw(
      context,
      program_state,
      spike_shield_transform,
      this.materials.spike
    );

    let spike_shield_tri_transform = spike_loc_transform
      .times(Mat4.translation(0, 0.54, 1))
      .times(Mat4.rotation(-Math.PI / 30, 1, 0, 0))
      .times(Mat4.rotation((-3 * Math.PI) / 4, 0, 0, 1))
      .times(Mat4.scale(0.13, 0.13, 1));
    this.shapes.triangle.draw(
      context,
      program_state,
      spike_shield_tri_transform,
      this.materials.spike
    );

    let spike_shield_tri_2_transform = spike_loc_transform
      .times(Mat4.translation(-0.25, 0.2, 0.92))
      .times(Mat4.rotation(-Math.PI / 6, 0, 1, 0))
      .times(Mat4.scale(0.25, 0.35, 1))
      .times(Mat4.rotation(-Math.PI / 4, 0, 0, 1));
    this.shapes.triangle.draw(
      context,
      program_state,
      spike_shield_tri_2_transform,
      this.materials.spike
    );

    let spike_shield_tri_3_transform = spike_loc_transform
      .times(Mat4.translation(0.25, 0.2, 0.92))
      .times(Mat4.rotation(Math.PI, 0, 0, 1))
      .times(Mat4.rotation(-Math.PI / 6, 0, 1, 0))
      .times(Mat4.scale(0.25, 0.35, 1))
      .times(Mat4.rotation(-Math.PI / 4, 0, 0, 1));
    this.shapes.triangle.draw(
      context,
      program_state,
      spike_shield_tri_3_transform,
      this.materials.spike
    );

    let spike_shield_transform_2 = spike_loc_transform
      .times(Mat4.translation(Math.sqrt(1 / 3), 0.2, 0))
      .times(Mat4.rotation((2 * Math.PI) / 3, 0, 1, 0))
      .times(Mat4.scale(0.1, 0.25, 0.03));
    this.shapes.cube.draw(
      context,
      program_state,
      spike_shield_transform_2,
      this.materials.spike
    );

    let spike_shield_tri_transform_2 = spike_loc_transform
      .times(Mat4.translation(Math.sqrt(1 / 3), 0.54, 0))
      .times(Mat4.rotation((2 * Math.PI) / 3, 0, 1, 0))
      .times(Mat4.rotation(-Math.PI / 30, 1, 0, 0))
      .times(Mat4.rotation((-3 * Math.PI) / 4, 0, 0, 1))
      .times(Mat4.scale(0.13, 0.13, 1));
    this.shapes.triangle.draw(
      context,
      program_state,
      spike_shield_tri_transform_2,
      this.materials.spike
    );

    let spike_shield_tri_2_transform_2 = spike_loc_transform
      .times(Mat4.translation(0.5, 0.2, 0.22))
      .times(Mat4.rotation(Math.PI / 4, 0, 1, 0))
      .times(Mat4.scale(0.25, 0.35, 1))
      .times(Mat4.rotation(-Math.PI / 4, 0, 0, 1));
    this.shapes.triangle.draw(
      context,
      program_state,
      spike_shield_tri_2_transform_2,
      this.materials.spike
    );

    let spike_shield_tri_3_transform_2 = spike_loc_transform
      .times(Mat4.translation(0.365, 0.2, -0.005))
      .times(Mat4.rotation(0, 0, 0, 1))
      .times(Mat4.rotation(Math.PI / 6, 0, 1, 0))
      .times(Mat4.scale(0.25, 0.35, 1))
      .times(Mat4.rotation(-Math.PI / 4, 0, 0, 1));
    this.shapes.triangle.draw(
      context,
      program_state,
      spike_shield_tri_3_transform_2,
      this.materials.spike
    );

    let spike_shield_transform_3 = spike_loc_transform
      .times(Mat4.translation(-Math.sqrt(1 / 3), 0.2, 0))
      .times(Mat4.rotation((-2 * Math.PI) / 3, 0, 1, 0))
      .times(Mat4.scale(0.1, 0.25, 0.03));
    this.shapes.cube.draw(
      context,
      program_state,
      spike_shield_transform_3,
      this.materials.spike
    );

    let spike_shield_tri_transform_3 = spike_loc_transform
      .times(Mat4.translation(-Math.sqrt(1 / 3), 0.54, 0))
      .times(Mat4.rotation((-2 * Math.PI) / 3, 0, 1, 0))
      .times(Mat4.rotation(-Math.PI / 30, 1, 0, 0))
      .times(Mat4.rotation((-3 * Math.PI) / 4, 0, 0, 1))
      .times(Mat4.scale(0.13, 0.13, 1));
    this.shapes.triangle.draw(
      context,
      program_state,
      spike_shield_tri_transform_3,
      this.materials.spike
    );

    let spike_shield_tri_2_transform_3 = spike_loc_transform
      .times(Mat4.translation(-0.5, 0.2, 0.22))
      .times(Mat4.rotation((3 * Math.PI) / 4, 0, 1, 0))
      .times(Mat4.scale(0.25, 0.35, 1))
      .times(Mat4.rotation(-Math.PI / 4, 0, 0, 1));
    this.shapes.triangle.draw(
      context,
      program_state,
      spike_shield_tri_2_transform_3,
      this.materials.spike
    );

    let spike_shield_tri_3_transform_3 = spike_loc_transform
      .times(Mat4.translation(-0.35, 0.2, -0.1))
      .times(Mat4.rotation(Math.PI, 0, 0, 1))
      .times(Mat4.rotation(0, 0, 1, 0))
      .times(Mat4.scale(0.25, 0.35, 1))
      .times(Mat4.rotation(-Math.PI / 4, 0, 0, 1));
    this.shapes.triangle.draw(
      context,
      program_state,
      spike_shield_tri_3_transform_3,
      this.materials.spike
    );

    let opacity = 0.08;
    if (this.iter <= this.frames_offset) {
      opacity = 0;
    } else if (this.iter > this.frames_offset && this.iter <= 6 * 60) {
      // 180 to 360 to 0 -> 0.08
      opacity = ((this.iter - 180) / 180) * 0.08;
    }
    let spike_sphere_r_2 = 0.05 * Math.sin(spike_t / 1.1) + 0.7;
    let spike_sphere_transform_2 = spike_loc_transform
      .times(Mat4.translation(0, spike_up, 0))
      .times(Mat4.scale(spike_sphere_r_2, spike_sphere_r_2, spike_sphere_r_2));
    this.shapes.spike_sphere.draw(
      context,
      program_state,
      spike_sphere_transform_2,
      this.materials.test.override({ color: color(1, 1, 1, opacity + 0.02) })
    );

    let spike_sphere_r_3 = 0.05 * Math.sin(spike_t / 1.1) + 1;
    let spike_sphere_transform_3 = spike_loc_transform
      .times(Mat4.translation(0, spike_up, 0))
      .times(Mat4.scale(spike_sphere_r_3, spike_sphere_r_3, spike_sphere_r_3));
    this.shapes.spike_sphere.draw(
      context,
      program_state,
      spike_sphere_transform_3,
      this.materials.test.override({ color: color(0, 0, 0, opacity) })
    );

    let spike_sphere_r = 0.05 * Math.sin(spike_t / 1.1) + 1.4;
    let spike_sphere_transform = spike_loc_transform
      .times(Mat4.translation(0, spike_up, 0))
      .times(Mat4.scale(spike_sphere_r, spike_sphere_r, spike_sphere_r));
    this.shapes.spike_sphere.draw(
      context,
      program_state,
      spike_sphere_transform,
      this.materials.test.override({ color: color(1, 1, 1, opacity) })
    );
  }

  draw_inter_plank(context, program_state, t){

    // underdamped b is small 
    let b = 0.5
    let m = 1.2;
    let w = Math.sqrt(4/m);
    let damp_osc;
    if (this.plank_shot){
      let plank_t = t-this.plank_t_diff;
      damp_osc = Math.E**(-b*plank_t/(2*m))*Math.cos(w*plank_t);
    }
    else {
      damp_osc = 1;
    }

    let plank_transform = Mat4.translation(-5.5,3,-16)
      .times(Mat4.translation(0,2,0))
      .times(Mat4.rotation(damp_osc, 0,0,1)) 
      .times(Mat4.translation(0,-2,0))
      .times(Mat4.scale(0.5,2.5,0.05));
    this.shapes.cube.draw(
      context, 
      program_state,
      plank_transform, 
      this.materials.wood_board.override({ ambient: 0.6})
    );

    let bolt_transform = Mat4.translation(-5.5,5,-15.9)
      .times(Mat4.scale(0.1,0.1,0.05));
      this.shapes.capped_cylinder.draw(
        context,
        program_state,
        bolt_transform, 
        this.materials.bullet
      );

      // disppearing bolt
      if (!this.plank_init){
        let bolt_2_transform = Mat4.translation(-2,2.8,-15.9)
        .times(Mat4.scale(0.1,0.1,0.05));
        this.shapes.capped_cylinder.draw(
          context,
          program_state,
          bolt_2_transform, 
          this.materials.bullet
        );
      }
  }

  draw_bullet_tracers(context, program_state){
    for (let i = 0; i < this.bullet_tracer_queue.length; i++){
      let life = --this.bullet_tracer_queue[i][1];
      if (life == 0){
        this.bullet_tracer_queue.shift();
        i--;
        continue;
      }
      let coord = this.bullet_tracer_queue[i][0];
      let tracer_transform = Mat4.translation(coord[0], coord[1], -17.5)
        .times(Mat4.scale(0.09,0.09,0.05));
      this.shapes.capped_cylinder.draw(
        context, 
        program_state, 
        tracer_transform, 
        this.materials.bullet
      )
    }
  }


  display(context, program_state) {
    const t = program_state.animation_time / 1000,
      dt = program_state.animation_delta_time / 1000;

    // allows for relative start time of the game
    if (gameStarted && !this.init) {
      // modify here to stall timer and spike
      this.t_diff = t;
      this.init = true;
      // console.log(t);
      console.log(this.t_diff);
    }
    this.iter++;

    // display():  Called once per frame of animation.
    // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
    if (!context.scratchpad.controls) {
      this.children.push(
        (context.scratchpad.controls = new defs.Movement_Controls())
      );
      // Define the global camera and projection matrices, which are stored in program_state.
      program_state.set_camera(this.initial_camera_location);

      let canvas = context.canvas;
      const mouse_position = (e, rect = canvas.getBoundingClientRect()) =>
        vec(
          (e.clientX - (rect.left + rect.right) / 2) /
            ((rect.right - rect.left) / 2),
          (e.clientY - (rect.bottom + rect.top) / 2) /
            ((rect.top - rect.bottom) / 2)
        );

      canvas.addEventListener("mousedown", (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        this.my_mouse_down(e, mouse_position(e), context, program_state);
      });
    }

    program_state.projection_transform = Mat4.perspective(
      Math.PI / 4,
      context.width / context.height,
      0.1,
      1000
    );

    // Lights
    const light_position = vec4(0, 10, 20, 1);
    const gun_light = vec4(0, 6, 20, 1); // to illuminate back of gun
    const spike_light = vec4(0, -3.2, -12, 1); // spike illumation

    let spike_light_size = 12;
    if (this.iter <= this.frames_offset) {
      spike_light_size = 0;
    } else if (this.iter > this.frames_offset && this.iter <= 6 * 60) {
      spike_light_size = ((this.iter - 180) / 180) * 12;
    }
    // The parameters of the Light are: position, color, size

    if (!this.game_end) {
      program_state.lights = [
        new Light(light_position, color(1, 0.95, 0.8, 1), 1000),
        new Light(spike_light, color(0.47, 1, 1, 1), spike_light_size),
      ];
    } else {
      program_state.lights = [
        new Light(light_position, color(1, 0.95, 0.8, 1), 0),
        new Light(spike_light, color(0.47, 1, 1, 1), 0),
      ];
    }

    // need to figure out how to add another light source
    // new Light(spike_light, hex_color("#a6ffff"), 10000)

    // background
    this.draw_sky(context, program_state);
    this.draw_floor(context, program_state);
    this.draw_walls(context, program_state);
    this.draw_props(context, program_state, t);
    this.draw_props2(context, program_state);
    this.draw_pillars(context, program_state);
    this.draw_backWindow(context, program_state);
    this.draw_guns_ground(context, program_state);

    // game interactives
    // shootable plank that becomes a dampling pendulumn
    this.draw_inter_plank(context, program_state, t);

    if (!this.game_end) {
      this.draw_targets(context, program_state, t);
      this.draw_gun(context, program_state, t, this.shot);
      this.draw_spike(context, program_state, t);
      this.draw_bullet_tracers(context, program_state);
    }

    // force timer on first frame

    if (this.iter == 1) {
      // we can make timer stall here for the initial countdown by setting this.iter <= 3 seconds * how many ever frames per second
      this.timer = config["timer"];
    } else {
      this.timer = config["timer"] - t + this.t_diff;
    }
    // console.log(this.timer);
    this.display_timer = Math.trunc(this.timer); // this will be passed to the scoreboard
    if (this.display_timer < 0) {
      this.display_timer = 0;
    }
    // console.log(this.display_timer);

    updateBar(this.points, this.accuracy, this.display_timer);

    if (!this.game_end && this.timer <= 1 && this.timer > 0) {
      audioFiles["spike_explode"].play();
    }
    if (this.timer <= 0 && this.timer > -2) {
      endGame();
      this.game_end = true;
      this.time += dt;
      this.R_explode = 40 * Math.sin(this.time);
      let sphere_transform = Mat4.translation(0, -4, -12).times(
        Mat4.scale(this.R_explode, this.R_explode, this.R_explode)
      );
      this.shapes.sphere.draw(
        context,
        program_state,
        sphere_transform,
        this.materials.test.override({
          diffusivity: 0,
          specularity: 0,
          color: color(1, 1, 1, 0.6),
        })
      );
    } else if (this.timer <= -2) {
      this.time += dt;
      if (this.R_explode <= 1 && this.R_explode >= -1) {
        this.R_explode = 0;
      } else {
        this.R_explode = 40 * Math.sin(this.time);
      }
      let sphere_transform = Mat4.translation(0, -4, -12).times(
        Mat4.scale(this.R_explode, this.R_explode, this.R_explode)
      );
      this.shapes.sphere.draw(
        context,
        program_state,
        sphere_transform,
        this.materials.test.override({
          diffusivity: 0,
          specularity: 0,
          color: color(1, 1, 1, 0.6),
        })
      );
    }
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
    return (
      ` 
        precision mediump float;
        const int N_LIGHTS = ` +
      this.num_lights +
      `;
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
        } `
    );
  }

  vertex_glsl_code() {
    // ********* VERTEX SHADER *********
    return (
      this.shared_glsl_code() +
      `
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
            } `
    );
  }

  fragment_glsl_code() {
    // ********* FRAGMENT SHADER *********
    // A fragment is a pixel that's overlapped by the current triangle.
    // Fragments affect the final image or get discarded due to depth.
    return (
      this.shared_glsl_code() +
      `
            void main(){                                                           
                // Compute an initial (ambient) color:
                gl_FragColor = vec4( shape_color.xyz * ambient, shape_color.w );
                // Compute the final color with contributions from lights:
                gl_FragColor.xyz += phong_model_lights( normalize( N ), vertex_worldspace );
            } `
    );
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
    const O = vec4(0, 0, 0, 1),
      camera_center = gpu_state.camera_transform.times(O).to3();
    gl.uniform3fv(gpu.camera_center, camera_center);
    // Use the squared scale trick from "Eric's blog" instead of inverse transpose matrix:
    const squared_scale = model_transform
      .reduce((acc, r) => {
        return acc.plus(vec4(...r).times_pairwise(r));
      }, vec4(0, 0, 0, 0))
      .to3();
    gl.uniform3fv(gpu.squared_scale, squared_scale);
    // Send the current matrices to the shader.  Go ahead and pre-compute
    // the products we'll need of the of the three special matrices and just
    // cache and send those.  They will be the same throughout this draw
    // call, and thus across each instance of the vertex shader.
    // Transpose them since the GPU expects matrices as column-major arrays.
    const PCM = gpu_state.projection_transform
      .times(gpu_state.camera_inverse)
      .times(model_transform);
    gl.uniformMatrix4fv(
      gpu.model_transform,
      false,
      Matrix.flatten_2D_to_1D(model_transform.transposed())
    );
    gl.uniformMatrix4fv(
      gpu.projection_camera_model_transform,
      false,
      Matrix.flatten_2D_to_1D(PCM.transposed())
    );

    // Omitting lights will show only the material color, scaled by the ambient term:
    if (!gpu_state.lights.length) return;

    const light_positions_flattened = [],
      light_colors_flattened = [];
    for (let i = 0; i < 4 * gpu_state.lights.length; i++) {
      light_positions_flattened.push(
        gpu_state.lights[Math.floor(i / 4)].position[i % 4]
      );
      light_colors_flattened.push(
        gpu_state.lights[Math.floor(i / 4)].color[i % 4]
      );
    }
    gl.uniform4fv(gpu.light_positions_or_vectors, light_positions_flattened);
    gl.uniform4fv(gpu.light_colors, light_colors_flattened);
    gl.uniform1fv(
      gpu.light_attenuation_factors,
      gpu_state.lights.map((l) => l.attenuation)
    );
  }

  update_GPU(context, gpu_addresses, gpu_state, model_transform, material) {
    // update_GPU(): Define how to synchronize our JavaScript's variables to the GPU's.  This is where the shader
    // recieves ALL of its inputs.  Every value the GPU wants is divided into two categories:  Values that belong
    // to individual objects being drawn (which we call "Material") and values belonging to the whole scene or
    // program (which we call the "Program_State").  Send both a material and a program state to the shaders
    // within this function, one data field at a time, to fully initialize the shader for a draw.

    // Fill in any missing fields in the Material object with custom defaults for this shader:
    const defaults = {
      color: color(0, 0, 0, 1),
      ambient: 0,
      diffusivity: 1,
      specularity: 1,
      smoothness: 40,
    };
    material = Object.assign({}, defaults, material);

    this.send_material(context, gpu_addresses, material);
    this.send_gpu_state(context, gpu_addresses, gpu_state, model_transform);
  }
}

class Texture_Scroll_X extends defs.Textured_Phong {
  fragment_glsl_code() {
    return (
      this.shared_glsl_code() +
      `
            varying vec2 f_tex_coord;
            uniform sampler2D texture;
            uniform float animation_time;
            
            void main(){
                // Sample the texture image in the correct place:

                mat4 scroll_matrix = mat4(vec4(1., .0, 0., 0.),
                                          vec4(0., 1., 0., 0.),
                                          vec4(0., 0., 1., 0.),
                                          vec4(animation_time / 300., 0., 0., 1.));

                vec4 scaled_tex_coord = vec4(f_tex_coord, 0., 0.) + vec4(1., 1., 0., 1.);
                scaled_tex_coord = scroll_matrix * scaled_tex_coord;
                
                vec4 tex_color = texture2D(texture, scaled_tex_coord.xy);

                if( tex_color.w < .01 ) discard;
                // Compute an initial (ambient) color:
                gl_FragColor = vec4( ( tex_color.xyz + shape_color.xyz ) * ambient, shape_color.w * tex_color.w ); 
                // Compute the final color with contributions from lights:
                gl_FragColor.xyz += phong_model_lights( normalize( N ), vertex_worldspace );
        } `
    );
  }
}
