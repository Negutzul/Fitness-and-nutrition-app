import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = ({setImage}) => {
  const navigate = useNavigate();
  const backgroundImageUrl = require('./../../../fitness-muscular-man-rear-shot-o7hjg0p7g1afqd8t.jpg');
  setImage(backgroundImageUrl);
    useEffect(() => {
        const key = 'tokenFitceps';
        
    }, []);

    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
      setShowModal(!showModal);
    };

    return <>
            <div className="parent-container">
      <header className="py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">
            Empowering Your Journey to Personal Greatness
          </h1>
        </div>
      </header>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-4 text-white">
              Welcome to the Next Level of Fitness Excellence
            </h2>
            <p className="text-lg text-white">
              At our esteemed fitness hub, our mission is to guide you on a transformative
              journey of self-improvement through expertly crafted workouts and personalized meal plans.
            </p>
            <p className="text-lg text-white mt-4">
              Our passionate and knowledgeable trainers are here to empower you with the tools, knowledge,
              and support needed to achieve your fitness goals and unlock your true potential.
            </p>
            <button
              onClick={toggleModal}
              className="mt-8 inline-block bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
            >
              Join Our Elite Community
            </button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-white mb-8">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Customized Workout Programs</h3>
              <p className="text-blue-800">
                Our expert trainers meticulously design tailored workout programs that cater to your unique goals
                and fitness levels. Unlock your potential and experience unparalleled progress with our personalized approach.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-blue-900">Nutrition Guidance</h3>
              <p className="text-blue-800">
                Fuel your body for success with our comprehensive meal plans, carefully crafted by our nutrition experts.
                From macronutrient ratios to specific dietary requirements, we'll provide the knowledge you need to optimize
                your nutrition and enhance your performance.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-blue-800">Supportive Community</h3>
              <p className="text-blue-800">
                Join our vibrant community of like-minded individuals who are on the same journey as you.
                Receive encouragement, share your achievements, and gain inspiration from our passionate trainers
                and fellow members. Together, we'll go beyond our limits and achieve greatness.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {showModal && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-gray-900 absolute inset-0 opacity-75"></div>
          </div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-container">
              <div className="bg-white rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-4 text-red-800">Sign Up</h2>
                <p className="text-gray-700">Modal content goes here...</p>
                <button
                  onClick={toggleModal}
                  className="mt-4 inline-block bg-red-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <footer className="py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-white">
            &copy; {new Date().getFullYear()} Your Workout Site. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </>;
  };
  
  export default Home;