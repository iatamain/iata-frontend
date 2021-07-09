#version 300 es

#define MAX_STEPS 128
#define MAX_DIST 4096.0
#define EPS_DIST 0.01
#define EPS_NORMAL 0.001

#define INF 1e27

#define WORLD_LIGHT_COL vec3(0.83, 0.89, 0.68)
#define WORLD_LIGHT_INTENCIVE 0.5

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


float sdSphere(in vec3 point, in vec4 sphere){
	return distance(point, sphere.xyz) - sphere.w;//sphere.w - radius
}

float sdFloor(in vec3 point){
	return point.y+7.;
}

float getDist(in vec3 point){
		//sphere
		float dist = INF;
/*
		//...dist and point from previous obj

		//copy point
		vec3 trans_point = point;
		//cut data
		//plane equation Ax+By+Cz+D = 0
		//(A,B,C) - normal of plane
		//D - distace from plane to (0,0,0)
		vec4 cutPlane = vec4(normalize(vec3(1.,1.,1.)),1.5);//vec4(A, B, C, D)
		//width of the rift = width*2
		float width = 30.;

		//get distance from point to plane
		float dist_PntPln = dot(cutPlane.xyz, trans_point)-cutPlane.w;
		//get projection of point on the plane or some closer
		trans_point = trans_point - cutPlane.xyz*min(abs(dist_PntPln), width)*sign(dist_PntPln);

		//use sdPrimitive()
		//float tmpDist = sdSphere(trans_point, u_sphereArray.pos[0]);
		float tmpDist = sdSphere(trans_point);


		//get distance from the rift
		if(abs(dist_PntPln)<width){
				tmpDist = length(vec2(abs(dist_PntPln)-width, max(tmpDist, 0.)));
		}

		//next obj...
		dist = min(dist, tmpDist);
		dist = min(dist, sdFloor(point));

*/
		dist = min(dist, sdFloor(point));
		for(uint i=0u; i<u_sphereArray.len; i++){
			dist = min(dist, sdSphere(point, u_sphereArray.pos[i]));
		}//*/
		return dist;
}

ivec2 getIds(in vec3 point){
		//sphere
		vec3 trans_point = vec3(point);
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

float RayMarch(in vec3 r_origin, in vec3 r_direction){
    float r_dist = 0.;
		float step = 0.;
    for(int i=0; i<MAX_STEPS; i++){
				step = getDist(r_origin + r_direction*r_dist);
				r_dist += step;
				if(abs(step) < EPS_DIST || r_dist > MAX_DIST)
						return r_dist;
		}
		return r_dist;
}

vec4 InfoRayMarch(in vec3 r_origin, in vec3 r_direction){
    float r_dist = 0.;
		float step = 0.;
    for(int i=0; i<MAX_STEPS; i++){
				step = getDist(r_origin + r_direction*r_dist);
				r_dist += step;
				if(abs(step) < EPS_DIST || r_dist > MAX_DIST)
						return vec4(r_dist, step, float(i), 0.);
		}
		return vec4(r_dist, step, float(MAX_STEPS), 1.);
}

float ShadowRayMarch(in vec3 r_origin, in vec3 r_direction, float maxDist){
		float shadow = 1.;
		float prevStep = INF;
		float step = 0.;
		float r_dist = 0.5;

		for(int i=0; i<MAX_STEPS; i++){
				if(r_dist>=maxDist)
						return shadow;
				step = getDist(r_origin + r_direction*r_dist);
				if(step < EPS_DIST)
						break;

				//Soft Shadow by iq
				//https://iquilezles.org/www/articles/rmshadows/rmshadows.htm 2020

				float deltaStep = step*step/(2.*prevStep);
				float height = sqrt(step*step - deltaStep*deltaStep);
				shadow = min(shadow, 20.*height/max(0.,r_dist-deltaStep));

				prevStep = step;
				r_dist += step;

		}
		return 0.;

}

float getPhong(in vec3 viewDir, in vec3 normal, in vec3 lightDir){
	float diffuse = max(dot(normal, -lightDir), 0.);
	float specular = pow(max(dot(-viewDir, reflect(lightDir, normal)),0.), 32.0);
	return diffuse + specular;
}

vec3 getWorldLight(in vec3 point, in vec3 normal){
		float shadow = ShadowRayMarch(point, -u_worldLightDir, MAX_DIST);
		return shadow*WORLD_LIGHT_COL*WORLD_LIGHT_INTENCIVE*max(dot(normal, -u_worldLightDir),0.);
}

vec3 getIllumination(in vec3 viewDir, in vec3 point, in vec3 normal, in ivec2 ids){
		vec3 col;
		switch(ids.x){
				case 0:
					col = vec3(0.3);
					break;
				case 1:
					col = u_sphereArray.col[ids.y].xyz;
					break;
		}
		col += getWorldLight(point, normal);

		for(uint i=0u; i<u_lightningArray.len; i++){
				vec4 lightPos = u_lightningArray.pos[i];
				vec4 lightCol = u_lightningArray.col[i];
				vec3 lightDir = normalize(lightPos.xyz - point);

				float dist = distance(lightPos.xyz, point);
				float shadow = ShadowRayMarch(point, lightDir, dist);

				col +=  lightCol.xyz*shadow*getPhong(viewDir, normal, -lightDir)*lightCol.w/(dist*dist);


				/*
				if(shadow == 0.){col = vec3(1.,0.,0.);}
				else{
					if(shadow > 0.){col = vec3(0.,0.,shadow);}
					else{col = vec3(0.,-shadow,0.);}
				}*/
		}
		return col;
}


void main(){
    //ray from pixel, camera
    vec3 ray_origin = u_cameraPosition;
		vec3 ray_direction = normalize(v_ray_direction);

    //raymarching
		//ray_dist and last min dist
		float dist = RayMarch(ray_origin, ray_direction);

		//position and normal
		vec3 point = ray_origin + ray_direction*dist;
		vec3 normal = getNormal(point);

		//colored
		vec3 col = vec3(0.);
		if(dist < MAX_DIST){
				//debuging
				switch(u_debugMode){
					case 1u:
						col = vec3(2.5/sqrt(dist));
						if(dist < 50.)col -= smoothstep(0.97,1.,max(fract(point.x),max(fract(point.y),fract(point.z))));
						break;
					case 2u:
						col = fract(point);
						break;
					case 3u:
						col = (normal+1.)*0.5;
						if(dist < 50.)col -= smoothstep(0.97,1.,max(fract(point.x),max(fract(point.y),fract(point.z))));
						break;
					default:
						col = getIllumination(ray_direction, point, normal, getIds(point));

				}
		}
		col = col;// -  dists.x/MAX_DIST; // FOG
		out_fragColor = vec4(col, 1.);
}
