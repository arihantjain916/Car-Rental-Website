"use client";
import { useRouter } from "next/navigation";
import CustomButton from "./customButton";
import { updateSearchParams } from "@/utils";

export const ShowMore = (props: {
  pageNumber: string | number | any;
  isNext: string | number | any;
}) => {
  const router = useRouter();

  const handleNavigation = () => {
    const newLimit = (props.pageNumber + 1) * 10
    const newPathName = updateSearchParams("limit", `${newLimit}`)
    router.push(newPathName)
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {!props.isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};
