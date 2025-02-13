use anchor_lang::prelude::*;

#[account]
#[derive(InitStake)]
pub struct StakeAcccount {
    pub owner: Pubkey,
    pub mint: Pubkey,
    pub last_update: i64,
    pub bump: u8,
}
