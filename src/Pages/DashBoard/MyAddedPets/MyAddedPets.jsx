import useAuth from "../../../Hooks/useAuth/useAuth";
import usePets from "../../../Hooks/usePets/usePets";
import Table from "../../../components/Table";

const MyAddedPets = () => {
  const { user } = useAuth();
  const email = user?.email;
  const [pets, refetch] = usePets("", "", email);
  console.log(pets);
  return (
    <div>
      <h1 className="uppercase text-5xl font-extrabold text-center my-10 text-transparent bg-clip-text bg-gradient-to-r from-[#ff922b] to-[#ffd43b]">
        My Added Pets
      </h1>
      <div>
        {/* {!isFetched ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="text-5xl animate-spin" />
          </div>
        ) : ( */}
        <Table data={pets} refetch={refetch}></Table>
        {/* // )} */}
      </div>
    </div>
  );
};

export default MyAddedPets;
