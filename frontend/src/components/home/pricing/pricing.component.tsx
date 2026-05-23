import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const pricingPlans = [
  {
    title: "Free",
    price: "$0",
    duration: "/month",
    features: [
      "Basic AI writing assistance",
      "5 stories per month",
      "Community access",
    ],
    buttonLabel: "Get Started",
    buttonStyle: "bg-gray-500 text-gray-300 hover:bg-gray-600",
    highlight: false,
    linkto: "/signup"
  },
  {
    title: "Pro",
    price: "$19",
    duration: "/month",
    features: [
      "Advanced AI writing tools",
      "Unlimited stories",
      "Priority support",
      "Analytics dashboard",
    ],
    
    buttonLabel: "Start Pro Trial",
    buttonStyle: "bg-indigo-600 text-white hover:bg-indigo-700",
    highlight: true,
    linkto: "/payment"
    
  },
  {
    title: "Enterprise",
    price: "$49",
    duration: "/month",
    features: [
      "Custom AI models",
      "Team collaboration",
      "API access",
      "24/7 dedicated support",
    ],
    buttonLabel: "Contact Sales",
    buttonStyle: "bg-gray-800 text-white hover:bg-gray-900",
    highlight: false,
    linkto: "/payment"
  },
];

const PricingComponent = () => {
  const navigate = useNavigate();
  return (
    <section className="mb-16 py-12" id="pricing-section">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-300">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Choose the plan that best fits your needs
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
           className={`
                         bg-blue-500/20
                          p-8
                          rounded-lg
                          shadow-sm
                          border
                         border-gray-200
                          transition-all
                          duration-300
                          cursor-pointer
                          hover:-translate-y-3
                          hover:shadow-2xl
                          hover:border-indigo-500
                          hover:scale-[1.02]
              ${
                  plan.highlight
                  ? "border-indigo-600 relative scale-105"
                  : ""
                }
              `}
          >
            {plan.highlight && (
              <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-sm rounded-bl-lg rounded-tr-lg">
                Popular
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2 text-gray-300">{plan.title}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold text-gray-500">{plan.price}</span>
              <span className="text-gray-500">{plan.duration}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button  className="..." 
  onClick={() => {
    navigate(plan.linkto);
  }}
>
  <Link 
  to={plan.linkto} 
  className={`mt-6 block w-full text-center font-medium py-2.5 px-4 rounded-lg transition-colors ${plan.buttonStyle}`}
>
  {plan.buttonLabel}
</Link>
</button>
              </div>
        ))}
      </div>
    </section>
  );
};

export default PricingComponent;