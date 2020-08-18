#version 300 es

#define MAX_STEPS 100
#define MAX_DIST 10000.0
#define EPS_DIST 0.01
#define EPS_NORMAL 0.001

#define INF 1e31

precision mediump float;

uniform vec3 u_cameraPosition;
uniform uint u_debugMode;

in vec3 v_ray_direction;
out vec4 out_fragColor;


float sdSphere(in vec4 point, in vec4 sphere){
	return distance(point.xyz, sphere.xyz) - sphere.w;//sphere.w - radius
}

float sdFloor(in vec4 point){
	return point.y;
}

float getDist(in vec3 point){
		//sphere
		vec4 trans_point = vec4(point, 1.);
		vec4 sphere = vec4(0., 5., 10., 5.);
		float dist = sdSphere(trans_point, sphere);

		dist = min(dist, sdFloor(trans_point));
		dist = min(dist, trans_point.x+5.);
		return dist;
}

vec2 RayMarch(in vec3 r_origin, in vec3 r_direction){
    float r_dist = 0.;
		float min_dist = 0.;
    for(int i=0; i<MAX_STEPS; i++){
				vec3 point = r_origin + r_direction*r_dist;
				min_dist = getDist(point);
				r_dist += min_dist;
				if(abs(min_dist) < EPS_DIST){
					min_dist = -INF;
					break;
				}
				if(r_dist > MAX_DIST){
					min_dist = INF;
					break;
				}
		}
		return vec2(r_dist, min_dist);
}

vec3 getNormal(in vec3 point){
		float dist = getDist(point);
		vec3 prenormal = vec3(
			getDist(point + vec3(EPS_NORMAL, 0., 0.)),
			getDist(point + vec3(0., EPS_NORMAL, 0.)),
			getDist(point + vec3(0., 0., EPS_NORMAL))
		) -  dist;
		return normalize(prenormal);
}

void main(){
    //ray from pixel, camera
    vec3 ray_origin = u_cameraPosition;
		vec3 ray_direction = normalize(v_ray_direction);

    //raymarching
		//ray_dist and last min dist
		vec2 dists = RayMarch(ray_origin, ray_direction);

		//position and normal
		vec3 point = ray_origin + ray_direction*dists.x;
		vec3 normal = getNormal(point);

		//colored
		vec3 col = vec3(0.);
		if(dists.y < INF){
				//debuging
				switch(u_debugMode){
					case 1u:
						col = vec3(1.-dists.x/MAX_DIST*.9);
						break;
					case 2u:
						col = fract(point);
						break;
					case 3u:
						col = (normal+1.)*0.5;
						break;
					default:
						col = vec3(1.-dists.x/MAX_DIST)*(normal+1.)*0.5;
						if(dists.x < 50.)col -= smoothstep(0.97,1.,max(fract(point.x),max(fract(point.y),fract(point.z))));
				}
		}
		out_fragColor = vec4(col, 1.);
}
