export function Header() {
  return (
    <ol className="bg-purple-950 flex items-center justify-center">
      <li className="p-10 text-white"><a href="https://lara.horse">lara.horse</a></li>
      <li className="p-10 text-white"><a href="https://sso-log.lara.horse">sso-log</a></li>
      <li className="p-10 text-white"><a href="https://horses.lara.horse">horses.lara.horse</a></li>
      {/* <li className="p-10 text-purple-900">sso-log.lara.horse</li>
  <li className="p-10 text-purple-900">I-GRMN.laracraft.io</li> */}
    </ol>
  );
}

export default Header;