import { Button } from "../ui/button";

export const CalculatorButton = ({ title, description, icon: Icon  }) => {
  return (
    <Button variant="none" className="w-full py-8">
      <div className="flex items-center justify-center bg-gray-200 rounded-full p-3">
        <Icon className="w-10 h-10 text-blue-600" />
      </div>

      <div className="flex flex-col text-left">
        <span className="text-lg font-bold text-gray-800">{ title }</span>
        <span className="text-sm text-gray-500">
          { description }
        </span>
      </div>
    </Button>
  );
};
