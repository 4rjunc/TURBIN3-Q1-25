# AMM : Automated Market Maker

This is anchor program to demostrate the working of AMM . Watch [this](https://www.youtube.com/watch?v=htXEEVkiIJ0) get an understanding of AMM.

## Architecture
- [Account structure](#account-structure)
- [Program instruction](#program-instruction)

## Account structure
```rust
#[account]
#[derive(InitSpace)]
pub struct Config {
    pub seed: u64, 
    pub authority: Option<Pubkey>,
    pub mint_x: Pubkey,
    pub mint_y: Pubkey,
    pub fee: u16,
    pub locked: bool,
    pub config_bump: u8,
    pub lp_bump: u8,
}
```
