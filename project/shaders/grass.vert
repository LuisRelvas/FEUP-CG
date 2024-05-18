attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uNMatrix;
uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform sampler2D uSampler; // This will hold your texture

varying highp vec2 vTextureCoord;
varying highp vec3 vEyeVec;

uniform float windFactor; 
uniform float time;

void main(void) {
    vec4 tmp = aVertexPosition;

    tmp.z += cos(time * 0.01) * sin(tmp.y * 0.3) * windFactor; 
    // Transformed Vertex position
    vec4 vertex = uMVMatrix * tmp;
    gl_Position = uPMatrix * vertex;
    vTextureCoord = aTextureCoord;

    // Sample the texture
    vec4 texColor = texture2D(uSampler, vTextureCoord);
}