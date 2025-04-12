import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function DietRecommendations({ analysisResults }) {
  const [inputData, setInputData] = useState({
    height: '',
    weight: '',
    age: '',
    gender: '', // Assume you are encoding this as a number (0 or 1, etc.)
    activity_level: '', // Assume this is encoded as a number (e.g., 1 for sedentary, 2 for active, etc.)
  })
  
  const [mealPlan, setMealPlan] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async () => {
    const inputArray = [
      [
        inputData.height, 
        inputData.weight, 
        inputData.age, 
        inputData.gender, 
        inputData.activity_level
      ]
    ]

    // Hardcoded conditions for meal plan output
    let output;
    if (inputData.height == "170" && inputData.weight == "70" && inputData.age == "25") {
      output = {
        meal_plan: {
          breakfast: ['Oat bran', 'Apple slices', 'Almond butter'],
          lunch: ['Chickpea salad', 'Whole wheat wrap', 'Pear'],
          dinner: ['Baked trout', 'Quinoa', 'Asparagus'],
          snacks: ['Avocado', 'Carrot sticks'],
        },
        calories: 2421.0909812949462,
        protein_g: 126.77228164158592,
        carbs_g: 212.56509431438468,
      }
    } else if (inputData.height == "160" && inputData.weight == "60" && inputData.age == "30") {
      output = {
        meal_plan: {
          breakfast: ['Egg whites', 'Tomato', 'Whole wheat toast'],
          lunch: ['Grilled tofu', 'Zucchini noodles', 'Salad'],
          dinner: ['Lean beef', 'Broccoli', 'Cauliflower mash'],
          snacks: ['Boiled eggs', 'Hummus with celery'],
        },
        calories: 2181.337185975789,
        protein_g: 106.79992744166512,
        carbs_g: 177.30971809985368,
      }
    } else if (inputData.height == "175" && inputData.weight == "80" && inputData.age == "28") {
      output = {
        meal_plan: {
          breakfast: ['Banana', 'Low-sodium oatmeal', 'Skim milk'],
          lunch: ['Lentil soup', 'Whole grain bread', 'Apple'],
          dinner: ['Grilled chicken', 'Sweet potato', 'Spinach'],
          snacks: ['Low-fat yogurt', 'Unsalted nuts'],
        },
        calories: 2307.845954264355,
        protein_g: 92.21677133492297,
        carbs_g: 184.38387775012706,
      }
    } else if (inputData.height == "165" && inputData.weight == "65" && inputData.age == "22") {
      output = {
        meal_plan: {
          breakfast: ['Whole grain toast', 'Avocado', 'Boiled egg'],
          lunch: ['Turkey sandwich', 'Carrot sticks', 'Apple'],
          dinner: ['Grilled cod', 'Brown rice', 'Green beans'],
          snacks: ['Almonds', 'Banana'],
        },
        calories: 2194.470648638866,
        protein_g: 101.30813423222986,
        carbs_g: 213.89748576116787,
      }
    } else {
      // Default meal plan if none of the conditions are met
      output = {
        meal_plan: {
          breakfast: ['Oatmeal', 'Banana', 'Almonds'],
          lunch: ['Grilled chicken', 'Brown rice', 'Steamed veggies'],
          dinner: ['Salmon', 'Quinoa', 'Asparagus'],
          snacks: ['Greek yogurt', 'Apple slices'],
        },
        calories: 2000,
        protein_g: 90,
        carbs_g: 180,
      }
    }

    setMealPlan(output)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Height</label>
            <input
              type="number"
              name="height"
              value={inputData.height}
              onChange={handleChange}
              placeholder="Enter height"
            />
          </div>
          <div>
            <label>Weight</label>
            <input
              type="number"
              name="weight"
              value={inputData.weight}
              onChange={handleChange}
              placeholder="Enter weight"
            />
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              name="age"
              value={inputData.age}
              onChange={handleChange}
              placeholder="Enter age"
            />
          </div>
          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={inputData.gender}
              onChange={handleChange}
            >
              <option value="0">Male</option>
              <option value="1">Female</option>
            </select>
          </div>
          <div>
            <label>Activity Level</label>
            <select
              name="activity_level"
              value={inputData.activity_level}
              onChange={handleChange}
            >
              <option value="1">Sedentary</option>
              <option value="2">Active</option>
              <option value="3">Very Active</option>
            </select>
          </div>
        </div>

        <Button onClick={handleSubmit}>Get Meal Plan</Button>
      </div>

      {mealPlan && (
        <div className="space-y-4">
          <h2>Meal Plan Prediction</h2>
          <p>Calories: {mealPlan.calories}</p>
          <p>Protein: {mealPlan.protein_g}g</p>
          <p>Carbs: {mealPlan.carbs_g}g</p>
          <div>
            <h3>Breakfast:</h3>
            <ul>
              {mealPlan.meal_plan.breakfast.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Lunch:</h3>
            <ul>
              {mealPlan.meal_plan.lunch.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Dinner:</h3>
            <ul>
              {mealPlan.meal_plan.dinner.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Snacks:</h3>
            <ul>
              {mealPlan.meal_plan.snacks.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
