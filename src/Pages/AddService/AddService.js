import React from "react";
import { useForm } from "react-hook-form";

const AddService = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const url = "http://localhost:5000/service";
    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res=> res.json())
    .then(result =>{
        console.log(result);
    })
    
  };
  return (
    <div className="w-50 mx-auto">
      <h2>Please Add a Service</h2>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Name"
          className="mb-2"
          {...register("name", { required: true, maxLength: 20 })}
        />
        <textarea
          placeholder="Description"
          className="mb-2"
          {...register("description")}
        />
        <input
          placeholder="Price"
          className="mb-2"
          type="number"
          {...register("price")}
        />
        <input type="text" placeholder="photo URL" {...register("img")} />
        <input type="submit" value="Add Service" />
      </form>
    </div>
  );
};

export default AddService;
