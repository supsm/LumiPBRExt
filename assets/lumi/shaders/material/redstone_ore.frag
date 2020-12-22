#include frex:shaders/api/sampler.glsl
#include frex:shaders/api/fragment.glsl
#include lumi:shaders/internal/ext_frag.glsl

/******************************************************
  lumi:shaders/material/redstone_ore.frag
******************************************************/

void frx_startFragment(inout frx_FragmentData data) 
{
  if(data.spriteColor.r > data.spriteColor.b * 2){
    data.emissivity = 1.0;
  }
#ifdef LUMI_PBR
  pbr_roughness = 0.7;
#endif
#ifdef LUMI_BUMP
#ifdef LUMI_BUMP_MINERALS
    _applyBump(data);
    // data.spriteColor.rgb *= (data.vertexNormal + 1) * 0.5;
#endif
#endif
}
