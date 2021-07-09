#version 300 es

#define PI 3.141592

uniform vec3 u_cameraDirection;

in vec4 a_position;

out vec3 v_ray_direction;

// mutiply quaternion
vec4 qtr_mul(in vec4 a, in vec4 b){
  return vec4( cross(a.xyz, b.xyz) + a.w*b.xyz + b.w*a.xyz, a.w*b.w + dot(a.xyz,b.xyz) );
}

void main(){
    float alpha = a_position.x*2.;
    float beta = -a_position.y*2.;

    vec4 camera_direction = normalize(vec4(u_cameraDirection, 0.));
    vec3 right_dir_cam = normalize(vec3(-camera_direction.z,0.,camera_direction.x));
    vec3 up_dir_cam = cross(camera_direction.xyz, right_dir_cam);

    vec4 pixelAlphaQuaternion = vec4(
      up_dir_cam*sin(alpha/2.),
      cos(alpha/2.)
    );

    vec4 pixelBetaQuaternion = vec4(
      right_dir_cam*sin(beta/2.),
      cos(beta/2.)
    );


    v_ray_direction = (qtr_mul(
        qtr_mul(
            camera_direction,
            pixelAlphaQuaternion
        ),
        pixelBetaQuaternion
    )).xyz;

    gl_Position = a_position;
}
