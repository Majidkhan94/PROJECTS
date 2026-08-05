import {Heading} from "../Export.js"
export const Loading = () => {
  return (
    <div className="flex items-center justify-center gap-2 h-full">
      <div className="w-10 h-10 border-2 border-gray-300 border-t-button-color rounded-full animate-spin"></div>
      <Heading text={"Loading...."}/>
    </div>
  );
};