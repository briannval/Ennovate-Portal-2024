import {
  ADMIN_RESOURCES_ACTIONS,
  IAdminResourcesAction,
} from "@/constants/admin-resources";
import Image from "next/image";

function AdminAction({
  image,
  heading,
  subheading,
  viewHref,
  addHref,
}: IAdminResourcesAction) {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={`image for ${heading}`}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {heading}
        </h5>
        <p className="mb-3 font-normal text-gray-700">{subheading}</p>
        <a
          href={viewHref}
          className="inline-flex items-center px-3 py-2 text-md font-medium text-center text-white bg-ennovate-main rounded-lg hover:bg-ennovate-dark-blue"
        >
          View
        </a>
        <a
          href={addHref}
          className="inline-flex items-center px-3 py-2 text-md font-medium text-center text-white bg-ennovate-main rounded-lg hover:bg-ennovate-dark-blue ml-2"
        >
          Add
        </a>
      </div>
    </div>
  );
}

export default function Admin() {
  return (
    <div className="flex flex-col px-8 py-8 max-w-screen-xl w-screen">
      <p className="text-4xl text-center font-extrabold tracking-tight text-ennovate-dark-blue sm:text-5xl">
        Admin Dashboard
      </p>
      <p className="mt-2 text-xl text-center font-bold leading-8 text-ennovate-dark-blue opacity-70 mb-8">
        Update teachers and students with one click.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...ADMIN_RESOURCES_ACTIONS].map(
          ({ image, heading, subheading, viewHref, addHref }, index) => {
            return (
              <AdminAction
                image={image}
                heading={heading}
                subheading={subheading}
                viewHref={viewHref}
                addHref={addHref}
                key={index}
              />
            );
          }
        )}
      </div>
    </div>
  );
}
