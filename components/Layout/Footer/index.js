import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="py-12 border-t border-white/10 bg-[#0b0f17]">
        <div className="md:max-w-[1024px] w-11/12 mx-auto">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="md:mr-auto">
              <p className="text-4xl font-extrabold text-center md:text-5xl md:text-start">
                CoderBluck<span className="text-primary">.</span>
              </p>
            </div>

            <div className="text-center text-white md:text-start md:ml-auto">
              <div>
                <ul className="flex justify-center space-x-4 md:justify-start">
                  <li>
                    <Link href={"/"}>
                      <p className="inline-block duration-200 hover:text-primary">Home</p>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/contact"}>
                      <p className="inline-block duration-200 hover:text-primary">Contact</p>
                    </Link>
                  </li>
                  <li>
                    <Link href={"/projects"}>
                      <p className="inline-block duration-200 hover:text-primary">Projects</p>
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <div className="flex justify-center space-x-4 text-2xl md:justify-start">
                  <Link href={"https://www.linkedin.com/in/oyenolaphilip/"} target="_blank">
                    <i className="cursor-pointer ri-linkedin-line"></i>
                  </Link>
                  <Link href={"https://twitter.com/oyenolaayomi"} target="_blank">
                    <i className="cursor-pointer ri-twitter-fill hover:text-primary"></i>
                  </Link>
                  <Link href={"https://github.com/coderbluck12"} target="_blank">
                    <i className="cursor-pointer ri-github-fill"></i>
                  </Link>
                  <Link href={"https://wa.me/+2349117996123"} target="_blank">
                    <i className="duration-200 hover:text-green-500 ri-whatsapp-fill"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 text-center">
            <p className="text-sm font-semibold text-white">@Philip Oyenola - All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
