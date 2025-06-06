import className from 'classnames';

type ProfileCardProps = {
  name: string;
  age: number;
  description: string;
  image: string;
  zodiac: string;
};

const ProfileCard = ({
  name,
  age,
  description,
  image,
  zodiac,
}: ProfileCardProps) => {
  const profileCardClass = className(
    'relative',
    'w-64',
    'h-[40rem]',
    'flex-shrink-0',
    'flex',
    'flex-col',
  );

  return (
    <div className={profileCardClass}>
      <div
        className="h-[50%] w-full overflow-hidden rounded-3xl border border-black" // Added border
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="relative h-[30%] w-full">
        <div
          className="absolute -top-6 left-0 mt-10 rounded-full border border-black bg-white p-2"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0)', width: '70%' }}
        >
          <h2 className="text-base font-semibold text-gray-900">
            {name}, {age}
          </h2>
        </div>
        <p className="mt-20 pl-0 text-left text-sm text-gray-900">
          {description}, <strong>{zodiac}</strong>
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
