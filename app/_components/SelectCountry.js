import { getCountries } from '@/app/_lib/data-service';

// Let's imagine your colleague already built this component 😃

// server component
async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();

  // Ensure the countries data is in the correct format [{name, flag}]
  const countryArray = Object.values(countries).map(country => ({
    name: country.name,
    flag: country.flag.small // or any other size you prefer
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
