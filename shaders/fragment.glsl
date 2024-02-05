uniform sampler2D globeTexture;
varying vec2 vUv; // [0, 0.24]

void main() {
    // vec2 uv  = texture2D(globeTexture, vUv).rg;
    // gl_FragColor = vec4(0, 1, 0, 1);
    // console.log(vUv);
    gl_FragColor = vec4(vec3(0, 0, 0.002) + texture2D(
        globeTexture, 
        vec2(0, 0.24)
        // vUv
    ).xyz, 1.0);
    // gl_FragColor = texture2D(globeTexture, vUv);
}