import useServices from "../../../hooks/useServices";
import Service from "../Service/Service";
import "./Services.css";
const Services = () => {
  const [services] = useServices();
  
  return (
    <div className="container" id="services">
      <div className="row">
        <h1 className="text-primary text-center mt-5">Our All Services: {services.length}</h1>
        <div className="services-container">
          {services.map((service) => (
            <Service key={service._id} service={service}></Service>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
