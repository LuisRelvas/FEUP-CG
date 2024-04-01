#ifdef GL_ES
precision highp float;
#endif

varying vec2 textCoords;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
    vec4 waterColor = texture2D(uSampler, textCoords+vec2(timeFactor*0.013, timeFactor*0.013));
    vec4 filter = texture2D(uSampler2, vec2(0.0,0.1) + textCoords);
    gl_FragColor = waterColor;
}