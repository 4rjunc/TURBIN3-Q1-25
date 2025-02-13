use anchor_lang::prelude::*;

declare_id!("FuCYDvNTVxWpu1JjCK5HACnXMeWQFMK3y8V4dKJu79r9");

#[program]
pub mod staking {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
