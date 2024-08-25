import React from "react";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-4 h-full w-full justify-center items-center">
      <h1 className="text-xl md:text-3xl px-8">Dashboard</h1>
      <div className="overflow-auto h-[80vh] pb-14 md:pb-8 px-8 py-8 w-full">
        <div className="flex flex-wrap gap-4 justify-evenly w-full">
          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-8px)] lg:w-[calc(25%-8px)] xl:w-[calc(15%-8px)] bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Card 1</h2>
            <p className="text-gray-600">This is card 1 content.</p>
          </div>
          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-8px)] lg:w-[calc(25%-8px)] xl:w-[calc(15%-8px)] bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Card 2</h2>
            <p className="text-gray-600">This is card 2 content.</p>
          </div>
          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-8px)] lg:w-[calc(25%-8px)] xl:w-[calc(15%-8px)] bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Card 3</h2>
            <p className="text-gray-600">This is card 3 content.</p>
          </div>
          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-8px)] lg:w-[calc(25%-8px)] xl:w-[calc(15%-8px)] bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Card 4</h2>
            <p className="text-gray-600">This is card 4 content.</p>
          </div>
          <div className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.33%-8px)] lg:w-[calc(25%-8px)] xl:w-[calc(15%-8px)] bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold">Card 5</h2>
            <p className="text-gray-600">This is card 5 content.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
