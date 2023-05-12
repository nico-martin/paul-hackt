import { useForm } from 'react-hook-form';
import { Form, FormElement, InputCheckbox, InputText } from "@theme";
import { useState } from 'react';

const Home = () => {
  const form = useForm();
  const [isGrownUp, setIsGrownUp] = useState(false);

  const handleFormSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };

  const handleCheckboxChange = () => {
    setIsGrownUp((prevValue) => !prevValue);
  };



  return (
    <div className="flex items-center justify-center h-screen">
      <Form onSubmit={form.handleSubmit(handleFormSubmit)} className="p-4 rounded-lg shadow-md">
        <FormElement
          label="What is your name?"
          Input={InputText}
          name="name"
          form={form}
        />

        <FormElement
          label="Are you a grown up?"
          Input={InputCheckbox}
          name="isGrownUp"
          form={form}
          onChange={handleCheckboxChange}
        >
          <InputCheckbox
            name="isGrownUp"
            checked={isGrownUp}
            onChange={handleCheckboxChange}
          />
        </FormElement>

        {isGrownUp ? (
          <FormElement
            label="What do you work or study as?"
            Input={InputText}
            name="occupation"
            form={form}
          />
        ) : (
          <FormElement
            label="What do you want to be when you grow up?"
            Input={InputText}
            name="dreamJob"
            form={form}
          />
        )}

        <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Submit
        </button>
      </Form>
    </div>
  );
};

export default Home;
