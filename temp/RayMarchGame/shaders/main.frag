#version 300 es

#define MAX_STEPS 128
#define MAX_DIST 512.0
#define EPS_DIST 0.01
#define EPS_NORMAL 0.001

#define INF 1e31

precision mediump float;

struct ParticleArray {
		uint len;
		vec4 pos[64];
		vec4 col[64];
};

uniform vec3 u_cameraPosition;
uniform uint u_debugMode;
uniform vec3 u_worldLightDir;

uniform ParticleArray u_sphereArray;
uniform ParticleArray u_lightningArray;

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

		float dist = sdFloor(trans_point);
		for(uint i=0u; i<u_sphereArray.len; i++){
			dist = min(dist, sdSphere(trans_point, u_sphereArray.pos[i]));
		}
		return dist;
}

ivec2 getIds(in vec3 point){
		//sphere
		vec4 trans_point = vec4(point, 1.);
		int type=0;
		uint array_index=0u;

		float dist = sdFloor(trans_point);
		for(uint i=0u; i<u_sphereArray.len; i++){
			float new_dist = sdSphere(trans_point, u_sphereArray.pos[i]);
			if(new_dist < dist){
					type = 1;
					array_index = i;
			}
		}
		return ivec2(type, array_index);
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

float getPhong(in vec3 viewDir, in vec3 normal, in vec3 lightDir){
	float diffuse = max(dot(normal, -lightDir), 0.);
	float specular = pow(max(dot(-viewDir, reflect(lightDir, normal)),0.), 32.0);
	return diffuse + specular;
}

float getWorldLight(in vec3 point, in vec3 normal){
		vec2 dists = RayMarch(point-u_worldLightDir, -u_worldLightDir);
		if(dists.y>-INF){
				return  max(dot(normal, -u_worldLightDir),0.);
		}
}

vec3 getIllumination(in vec3 viewDir, in vec3 point, in vec3 normal, in ivec2 ids){
		vec3 col;
		switch(ids.x){
				case 0:
					col = vec3(0.65);
					break;
				case 1:
					col = u_sphereArray.col[ids.y].xyz;
					break;
		}
		col *= getWorldLight(point, normal);

		for(uint i=0u; i<u_lightningArray.len; i++){
				vec3 lightPos = u_lightningArray.pos[i].xyz;
				vec4 lightCol = u_lightningArray.col[i];
				vec3 lightDir = normalize(point - lightPos);

				vec2 dists = RayMarch(lightPos, lightDir);
				if(dists.y == -INF && abs(dists.x - length(point - lightPos)) < 1. ){
						col +=  lightCol.xyz*getPhong(viewDir, normal, lightDir)*lightCol.w/(dists.x*dists.x);
				}

				float sunRise = dot(normalize(lightPos-u_cameraPosition), lightDir);
				if(sunRise > 0.99){
						col +=  lightCol.xyz*(sunRise/0.99)*lightCol.w/(dists.x);
				}
		}
		return col;
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
						if(dists.x < 50.)col -= smoothstep(0.97,1.,max(fract(point.x),max(fract(point.y),fract(point.z))));
						break;
					case 2u:
						col = fract(point);
						break;
					case 3u:
						col = (normal+1.)*0.5;
						if(dists.x < 50.)col -= smoothstep(0.97,1.,max(fract(point.x),max(fract(point.y),fract(point.z))));
						break;
					default:
						col = getIllumination(ray_direction, point, normal, getIds(point));

				}
		}
		col -= dists.x/MAX_DIST; // FOG
		out_fragColor = vec4(col, 1.);
}
