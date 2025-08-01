import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
  return (
    <>
      <div className="flex aspect-square w-8 h-8 items-center justify-center rounded-md bg-yellow-400 text-yellow-900 shadow-md">
        <AppLogoIcon className="w-5 h-5 fill-current" />
      </div>
      <div className="ml-2 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-semibold text-yellow-900">
          Leza Bakery
        </span>
      </div>
    </>
  );
}
