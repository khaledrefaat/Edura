export function ProfileHeader() {
  return (
    <div className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-2xl shadow-lg p-8 text-white">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl border-2 border-white/30">
            K
          </div>
          <div>
            <h1 className="text-3xl mb-1">Khaled Refaat</h1>
            <p className="text-white/80">khaledrefaat08@gmail.com</p>
            <span className="inline-block mt-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30">
              Teacher
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
