import { discordUserQueryStore } from "@/store";
import { useStore } from "@nanostores/react";

const CustomSocialIcons = () => {
  const { data } = useStore(discordUserQueryStore)
  console.log("data",data)
  return (
    <div>
        {data?.isLoggedIn ? <>{data.user.username}</> : <>Login</> }
    </div>
  );
}

export { CustomSocialIcons }