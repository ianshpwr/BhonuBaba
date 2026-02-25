export const silkVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uStrength;
  uniform vec2 uResolution;

  // Simplex noise for organic detail
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    float m3 = 1.0 - 0.5 * (a0.x*a0.x + a0.y*a0.y + h.x*h.x + h.y*h.y);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = uv * aspect;
    vec2 m = uMouse * aspect;

    // Physics: Multi-layered Tension Waves (Layered silk snap)
    float dist = distance(p, m);
    
    // Primary Gaussian indent
    float indent = exp(-dist * dist * 12.0) * uStrength * 3.0; 
    
    // Multi-octave ripple layers:
    // Layer 1: Sharp, fast snap ripple
    float r1 = sin(dist * 20.0 - uTime * 4.0) * exp(-dist * 10.0);
    // Layer 2: Deeper, slower resonance ripple
    float r2 = sin(dist * 10.0 - uTime * 2.5) * exp(-dist * 6.0);
    // Layer 3: Faint high-frequency vibration
    float r3 = sin(dist * 40.0 - uTime * 6.0) * exp(-dist * 15.0);
    
    float ripples = (r1 * 1.0 + r2 * 0.6 + r3 * 0.3) * uStrength * 1.2;
    
    // Combined Displacement
    float totalDisp = indent + ripples;
    
    // Static micro-texture "tooth"
    float detail = snoise(uv * 12.0) * 0.003;
    
    pos.z += totalDisp + detail;
    
    // Texture distortion (Enhanced threads stretching)
    vUv = uv + normalize(p - m) * totalDisp * 0.08;
    
    // Reusable ripple function for normal estimation
    #define GET_RIPPLES(d_val) ( (sin((d_val) * 20.0 - uTime * 4.0) * exp(-(d_val) * 10.0) * 1.0 + sin((d_val) * 10.0 - uTime * 2.5) * exp(-(d_val) * 6.0) * 0.6 + sin((d_val) * 40.0 - uTime * 6.0) * exp(-(d_val) * 15.0) * 0.3) * uStrength * 1.2 )
    #define GET_INDENT(d_val) ( exp(-(d_val) * (d_val) * 12.0) * uStrength * 3.0 )
    #define GET_TOTAL(d_val) ( GET_INDENT(d_val) + GET_RIPPLES(d_val) )

    float d = 0.015;
    float distN1 = distance(p + vec2(d, 0) * aspect, m);
    float distN2 = distance(p - vec2(d, 0) * aspect, m);
    float distN3 = distance(p + vec2(0, d) * aspect, m);
    float distN4 = distance(p - vec2(0, d) * aspect, m);

    float n1 = GET_TOTAL(distN1);
    float n2 = GET_TOTAL(distN2);
    float n3 = GET_TOTAL(distN3);
    float n4 = GET_TOTAL(distN4);
    
    vNormal = normalize(vec3(n2-n1, n4-n3, d * 4.0));
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const silkFragmentShader = `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;

  uniform vec3 uBaseColor;
  uniform vec3 uShadowColor;
  uniform vec3 uAccentColor;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uAmbient;
  uniform float uShininess;

  // Simplex noise for organic detail
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 a0 = x - floor(x + 0.5);
    float m3 = 1.0 - 0.5 * (a0.x*a0.x + a0.y*a0.y + h.x*h.x + h.y*h.y);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    
    // Minimal Editorial Lighting
    vec3 lightDir = normalize(vec3(0.5, 0.8, 0.6));
    vec3 sweepDir = normalize(vec3(cos(uTime * 0.3), 0.5, sin(uTime * 0.3)));
    
    // Diffused Diffuse
    float diff = max(dot(normal, lightDir), 0.0);
    float lightSweep = pow(max(dot(normal, sweepDir), 0.0), 12.0) * 0.04;
    
    // Golden Specular (Brushed Silk)
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), uShininess);
    vec3 specular = spec * vec3(1.0, 0.92, 0.8) * 0.15;
    
    // Soft Fresnel Rim
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);
    
    // Dynamic Weave Texture
    float weaveScale = 2200.0;
    float weave = sin(vUv.x * weaveScale) * sin(vUv.y * weaveScale);
    weave = smoothstep(-0.4, 0.4, weave);
    
    // Surface Detail
    float noise = snoise(vUv * 60.0) * 0.015;
    
    // Final Blend
    vec3 color = mix(uShadowColor, uBaseColor, diff * uIntensity + uAmbient);
    
    // Add warm golden accents
    color += specular;
    color += fresnel * 0.1 * vec3(1.0, 0.95, 0.88);
    color += lightSweep * vec3(1.0, 0.98, 0.9);
    
    // Subtle weave depth
    color -= (weave + noise) * 0.004;
    
    // High-end Editorial Vignette
    float vignette = 1.0 - smoothstep(0.3, 1.4, length(vUv - 0.5));
    color *= mix(0.96, 1.0, vignette);
    
    // Gentle gradient blend at the top
    float topGradient = smoothstep(1.0, 0.7, vUv.y);
    color = mix(color, uBaseColor * 0.98, topGradient * 0.05);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;
