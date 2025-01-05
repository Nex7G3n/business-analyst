import { Button } from "../ui/button";
import { DialogTrigger } from "../ui/dialog";

export const CalculatorButton = ({ title, description, icon: Icon }) => {
  return (
    <DialogTrigger asChild>
      <Button variant="none" className="w-full py-8" >
        <div className="flex items-center justify-center bg-gray-200 rounded-full p-3">
          <Icon className="w-10 h-10 text-blue-600" />
        </div>

        <div className="flex flex-col text-left w-full overflow-x-hidden">
          <span className="w-full text-lg font-bold text-gray-800 text-truncate">
            {title}
          </span>
          <span className="w-full text-sm text-gray-500 overflow-x-hidden">
            {description}
          </span>
        </div>
      </Button>
    </DialogTrigger>
  );
};
