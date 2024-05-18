#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {

    vec4 color = texture2D(uSampler, vTextureCoord);

    vec4 colorGreen = color;
    colorGreen.r = color.r * 0.1;
    colorGreen.g = color.g * 1.0;
    colorGreen.b = color.b * 0.1;

    gl_FragColor = colorGreen;
}