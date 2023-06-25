import Benefits from "../sections/Benefits/BenefitsList";
import content from "../sections/Benefits/content.json";
import TopItemsSlider from "../sections/TopItemsSlider/TopItemsSlider";

const Main = () => {
  return (
    <main>
      <TopItemsSlider />
      <Benefits content={content} />
    </main>
  );
};

export default Main;
