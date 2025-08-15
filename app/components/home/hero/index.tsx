import { getCurrentLang } from "@/app/lib/language/getCurrentLang";
import { HeroContent } from "./content";
import { fetchHeroData } from "@/app/lib/fetch/fetchHero";

const Hero = async () => {
  const lang = await getCurrentLang(); 
  const hero = await fetchHeroData(lang);

  return <HeroContent hero={hero} />;
};

export default Hero;
