#include frex:shaders/api/sampler.glsl
#include frex:shaders/api/fragment.glsl
#include lumiext:shaders/internal/frag.glsl

/******************************************************
  lumiext:shaders/material/gem_bumpy.frag
******************************************************/

void frx_startFragment(inout frx_FragmentData data) 
{
  #ifdef LUMI_PBRX
    pbr_roughness = 0.1;
    #if LUMI_PBR_API >= 1
      pbr_f0 = 0.2;
    #endif
  #endif
  
  #ifdef LUMIEXT_ApplyBumpMinerals
    if (!data.diffuse) {
      float resRCP = ONE_PIXEL * 8.0;
      float coarseness = 0.4;
      vec2 uvN = floor((frx_var1.wz + frx_var1.zw * vec2(1.0, -1.0)) / resRCP) * resRCP;
      vec2 uvT = uvN + vec2(0.5 * resRCP, 0.);
      vec2 uvB = uvN + vec2(0., 0.5 * resRCP);
      _applyMicroNormal(data, bump_coarse_normal(data.vertexNormal, uvN, uvT, uvB, l2_tangent, coarseness));
    } else {
      _applyBump(data);
    }
  #endif
  
  data.diffuse = true;
}
