const StepsDisplay = ({ steps }) => {
    return (
      <ol className="list-decimal ml-5 space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="text-sm text-white">
            {step}
          </li>
        ))}
      </ol>
    );
  };
  
  export default StepsDisplay;