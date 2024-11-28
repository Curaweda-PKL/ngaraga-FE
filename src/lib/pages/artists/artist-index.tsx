import type React from 'react';

const ProfilePage: React.FC = () => {
  return (
    <div className="profile w-screen">
      {/* Background Section */}
      <section className="relative block w-full h-64">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            background: `linear-gradient(180deg, rgba(151, 71, 255, 0.00) 21.88%, #9747FF 95.31%), 
              url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80') 
              lightgray 50% / cover no-repeat`,
          }}
        >
          <span className="w-full h-full absolute opacity-50 bg-purple-700" />
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
