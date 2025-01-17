import { SearchFilter } from "@/widgets/filters";
import BodyWrapper from "@/widgets/wappers/BodyWrapper";

const SlowQueriesBody = () => {
  return (
    <BodyWrapper>
      <SearchFilter onSearch={() => {}} />
    </BodyWrapper>
  );
};

export default SlowQueriesBody;
