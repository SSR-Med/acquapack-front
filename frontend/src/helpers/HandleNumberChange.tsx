// Only numbers in textfields
// Regex
const numberRegex = /^[0-9]+$/; 
export const HandleNumberChange = (setter: (value: string) => void) => (
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (numberRegex.test(newValue) || newValue === "") {
        setter(newValue); 
      }
    }
);
// Only numbers in textfield + decimal
// Regex
const decimalRegex = /^[0-9]+(\.)*([0-9])*$/;
export const HandleDecimalChange = (setter: (value: string) => void) => (
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      if (decimalRegex.test(newValue) || newValue === "") {
        setter(newValue); 
      }
    }
);