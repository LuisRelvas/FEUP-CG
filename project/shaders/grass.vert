attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aVertexNormal; 

uniform vec3 uBasePosition; // Changed from attribute to uniform

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
varying vec2 vTextureCoord;

uniform float windFactor;

void main() {
    vTextureCoord = aTextureCoord;

    // Convert windFactor from degrees to radians and clamp to [-15, 15] degrees
    float angle = clamp(windFactor, -15.0, 15.0) * 3.14159 / 180.0;

    // Apply rotation to the Z axis
    mat4 rotationMatrix = mat4(
        vec4(cos(angle), -sin(angle), 0.0, 0.0),
        vec4(sin(angle), cos(angle), 0.0, 0.0),
        vec4(0.0, 0.0, 1.0, 0.0),
        vec4(0.0, 0.0, 0.0, 1.0)
    );

    // Translate vertex position so that the base of the grass blade is at the origin
    vec3 translatedPosition = aVertexPosition - uBasePosition;

    // Apply rotation and then transformations
    vec4 rotatedPosition = rotationMatrix * vec4(translatedPosition, 1.0);

    // Translate it back
    rotatedPosition = rotatedPosition + vec4(uBasePosition, 0.0);

    gl_Position = uPMatrix * uMVMatrix * rotatedPosition;
}