class CityIsMandatory extends Error{
  constructor(){
    super('City is required');
  }
}

export { CityIsMandatory };
