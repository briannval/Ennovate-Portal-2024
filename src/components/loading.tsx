import Image from "next/image";

const Loading = () => {
  return (
    <div className="flex flex-col">
      <Image
        src="/ennovate-sleep.gif"
        alt="Loading State"
        width={300}
        height={300}
      />
      <p className="text-center text-ennovate-main font-bold text-3xl">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
