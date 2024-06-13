import { getCountries } from '@/app/_lib/data-service';

// server component
async function SelectCountry({ defaultCountry, name, id, className }) {
  let response;
  try {
    response = await getCountries();
  } catch (error) {
    console.error('Error fetching countries:', error);
    return <div>Error loading countries</div>;
  }

  const countries = response.data; // Access the array of countries

  // Ensure the countries data is in the correct format [{name, flag}]
  const countryArray = countries.map(country => ({
    name: country.name,
    flag: country.href.picture
  }));


  const flag =
    countryArray.find((country) => country.name === defaultCountry)?.flag ?? '';

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countryArray.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
