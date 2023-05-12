import { useForm } from 'react-hook-form';
import { Form, FormElement, InputCheckbox } from "@theme";

const Home: NextPage = () => {
  const { handleSubmit, control } = useForm();

  const handleFormSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked;
    console.log(value);
    // Handle checkbox value change
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 rounded-lg shadow-md">
        <FormElement
          label="Are you a grown up?"
          Input={InputCheckbox}
          name="isGrownUp"
          form={{ control }} // Pass the control object as a prop
        >
          <InputCheckbox
            name="isGrownUp"
            onChange={handleCheckboxChange} // Update the onChange prop
          />
        </FormElement>
        {/* Other form elements */}
        <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default Home;
