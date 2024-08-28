const BlogSection = ({ featured }: { featured: boolean }) => {
  // for testing
  const blogs = [
    {
      id: 1,
      date: "Jan 01, 2023",
      title: "Clever ways to invest in product to organize your portfolio",
      description:
        "Discover smart investment strategies to streamline and organize your portfolio.",
      imageUrl: "https://pagedone.io/asset/uploads/1696244317.png",
    },
    {
      id: 2,
      date: "Feb 01, 2023",
      title: "How to grow your profit through systematic investment with us",
      description:
        "Unlock the power of systematic investment with us and watch your profits soar. Our...",
      imageUrl: "https://pagedone.io/asset/uploads/1696244340.png",
    },
    {
      id: 3,
      date: "Mar 01, 2023",
      title: "How to analyze every holdings of your portfolio",
      description:
        "Our comprehensive guide will equip you with the tools and insights needed to...",
      imageUrl: "https://pagedone.io/asset/uploads/1696244356.png",
    },
  ];

  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl"
            >
              <div className="flex items-center">
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="rounded-t-2xl w-full"
                />
              </div>
              <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                <span className="text-ennovate-main font-medium mb-3 block">
                  {blog.date}
                </span>
                <h4 className="text-xl text-gray-900 font-medium leading-8 mb-2">
                  {blog.title}
                </h4>
                <p className="text-gray-500 leading-6 mb-4">
                  {blog.description}
                </p>
                <p className="text-lg text-ennovate-main font-semibold">
                  Read more..
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
