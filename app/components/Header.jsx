const Search = () => {
  return (
    <>
      <form id="form1" action="自分のサイトURL">
        <input id="sbox1" name="s" type="text" placeholder="キーワードを入力" />
        <input id="sbtn1" type="submit" value="検索" />
      </form>
    </>
  );
};

const Header = () => {
  return (
    <header>
      <Search></Search>
    </header>
  );
};

export default Header;
