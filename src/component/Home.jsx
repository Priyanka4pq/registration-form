export default function Home({ SetLoggedin, userData, setUserData }) {
  const handleLogoutClick = () => {
    SetLoggedin(false);

    setUserData({ email: null, number: null, name: null });
  };

  return (
    <div className="flex flex-col justify-center items-center bg-blue-100 h-screen">
      <h1 className="text-4xl font-bold">Welcome to Home Page!</h1>
      <p className="text-xl mt-4">You are successfully logged in.</p>

      <button
        className="text-white bg-red-500 p-2 mt-8 w-32 rounded-md"
        onClick={handleLogoutClick}
      >
        Logout
      </button>
      <div className="card bg-red-200 h-96 w-96 p-3 m-3 border-purple-400 rounded-lg flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-2xl text-blue-500 capitalize">
          Name : {userData.name}
        </h1>
        <h1 className="font-bold text-2xl text-blue-500 capitalize">
          Email : {userData.email}
        </h1>

        <h1 className="font-bold text-2xl text-blue-500 capitalize">
          Phone Number : {userData.number}
        </h1>
      </div>
    </div>
  );
}
