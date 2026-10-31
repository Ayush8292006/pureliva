import React from "react";
import { Product, calculatePerServe } from "../data/products";

interface NutritionTableProps {
  product: Product;
  className?: string;
}

export const NutritionTable: React.FC<NutritionTableProps> = ({ product, className = "" }) => {
  return (
    <div className={`overflow-hidden rounded-2xl border border-gray-200 bg-white ${className}`}>
      <div className="bg-pureliva-green text-white p-4">
        <h4 className="font-heading text-lg font-bold">Nutritional Information</h4>
        <p className="text-xs text-emerald-100 mt-0.5">
          Serving Size: {product.servingSizeGrams}g ({product.servingsPerPack})
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70 text-xs font-semibold text-pureliva-heading uppercase tracking-wider">
              <th scope="col" className="py-3 px-4 sm:px-6">Nutrient</th>
              <th scope="col" className="py-3 px-3 text-right">Per 100g</th>
              <th scope="col" className="py-3 px-3 text-right">Per Serve ({product.servingSizeGrams}g)</th>
              <th scope="col" className="py-3 px-4 sm:px-6 text-right">% RDA*</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {product.nutrients.map((item, idx) => {
              const perServe = calculatePerServe(item.per100g, product.servingSizeGrams);
              return (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-2.5 px-4 sm:px-6 font-medium text-pureliva-heading">
                    {item.label}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-xs sm:text-sm">
                    {item.per100g} {item.unit}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-xs sm:text-sm text-pureliva-green font-medium">
                    {perServe} {item.unit}
                  </td>
                  <td className="py-2.5 px-4 sm:px-6 text-right font-mono text-xs sm:text-sm text-gray-500">
                    {item.rda !== undefined ? `${item.rda}%` : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-gray-50 text-[11px] text-gray-500 leading-normal border-t border-gray-100">
        *%RDA values are based on a 2,000 kcal diet for an average adult as per ICMR 2020 guidelines. Individual nutrient requirements may vary depending on age, gender, and physical activity level.
      </div>
    </div>
  );
};

export default NutritionTable;

