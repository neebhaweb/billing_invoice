const incrementString = (input: string | number): string => {
    // Convert passed argument to string
    const str = input.toString();
  
    // Extract number part from the string
    const match = str.match(/\d+/);
    let number = match === null ? "0" : match[0];
  
    // Store the length of the original number
    const numberLength = number.length;
  
    // Increment the number by 1
    number = (parseInt(number, 10) + 1).toString();
  
    // If there were leading zeros, add them again
    while (number.length < numberLength) {
      number = "0" + number;
    }
  
    // Replace the number in the string and return the result
    return str.replace(/[0-9]/g, "").concat(number);
  };
  
  export default incrementString;
  