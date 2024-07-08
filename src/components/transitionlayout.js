import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const router = useRouter();

  console.log("layout component rendered");

  return (
    <motion.div
      key={router.pathname}
      initial="pageInitial"
      animate="pageAnimate"
      exit="pageExit"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        },
        pageExit: {
          opacity: 0,
          transition: {
            duration: 0.3,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default Layout;
